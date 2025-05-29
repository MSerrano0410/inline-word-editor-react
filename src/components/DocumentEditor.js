import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import { convertFileToHTML } from '../Services/CommonService';
import mammoth from 'mammoth';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/**
 * DraftJS document editor
 * currentContent exported so Save functionality can be handled at Dialog level
 * @param {*} link - name of file to convert to HTML and insert into editor
 */

export let currentContent = '';
export const DocumentEditor = ({link = null }) => {
    const [html, setHtml] = useState('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    currentContent = stateToHTML(editorState.getCurrentContent()); //gets HTML content from editor instance

    useEffect(() => {
        //get file from REST downloadDoc call (gets byte array), then convert to HTML; Convert function needs to get file locally!
        const fileAsHTML = convertFileToHTML(link);
        fileAsHTML.then(resp => resp.blob()).then(blob => {
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(blob);
            fileReader.onload = async (event) => {
                const arrayBuffer = event.target.result;
                const mammothOptions = { //used to render underline properly in draftJS instance
                    styleMap: [
                        "u => u"
                    ]
                };
                const { docContentAsHTML } = await mammoth.convertToHtml({ arrayBuffer }, options);
                setHtml(docContentAsHTML); 
            };

            //if HTML not empty, convert to DraftJS format and insert into Editor
            if (html !== '') {
                const blocksFromHTML = convertFromHTML(html);
                const { contentBlocks, entityMap } = blocksFromHTML;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                setEditorState(EditorState.createWithContent(contentState));
            } else {
                setEditorState(EditorState.createEmpty());
            }
        }).catch((e) => console.log(e));//TODO: make catch statement show an error message.
    }, [link, html]);

    //TODO: Add more options in toolbar as they're worked on and tested in the HTML -> DOCX Java code.
    return (
        <>
            <Editor
                placeholder="Document is empty or loading. If empty, enter some text here."
                editorStyle={{height: "70vh" }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                    options: ['inline', 'fontSize', 'link'],
                    inline: { inDropdown: true, options: ['bold', 'italic', 'underline', 'subscript'] },
                    list: { inDropdown: true },
                    link: { inDropdown: true }
                }}
            />
        </>
    );
};