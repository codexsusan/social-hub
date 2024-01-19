import { uploadFile } from "@/utils/fileUtils";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";

function TextEditor({
    contentData,
    changeContent,
}: {
    contentData: string;
    changeContent: (content: string) => void;
}) {
    const [content, setContent] = useState<string>(contentData || "");

    function uploadAdapter(loader: any) {
        return {
            upload: async () => {
                const formData = new FormData();
                const file = await loader.file;
                formData.append("upload", file);
                const response = await uploadFile(formData);
                return {
                    default: response.data.url,
                };
            },
        };
    }

    function uploadPlugin(editor: any) {
        editor.plugins.get("FileRepository").createUploadAdapter = (
            loader: any
        ) => {
            return uploadAdapter(loader);
        };
    }

    return (
        <div className="App">
            <CKEditor
                editor={ClassicEditor}
                config={{
                    extraPlugins: [uploadPlugin],
                    placeholder: "Enter your thoughts here..."
                }}
                onChange={(_event, editor: ClassicEditor) => {
                    const data = editor.getData();
                    setContent(data);
                    changeContent(data)
                }}
                data={content}
            />
        </div>
    );
}

export default TextEditor;
