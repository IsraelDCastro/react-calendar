import { useRef, useState } from "react";
import { EditorState, ContentState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";import ViewerEditor from "./viewerEditor";

function DynamicEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState([]);
  const editorRef = useRef(null);
  const hotels = {
    california: {
      name: "Hotel California",
      price: 200,
    },
    madrid: {
      name: "Hotel Madrid",
      price: 150,
    },
    paris: {
      name: "Hotel París",
      price: 250,
    },
    rome: {
      name: "Hotel Roma",
      price: 180,
    },
    newyork: {
      name: "Hotel Nueva York",
      price: 300,
    },
    miami: {
      name: "Hotel Miami",
      price: 170,
    },
    london: {
      name: "Hotel Londres",
      price: 220,
    },
    berlin: {
      name: "Hotel Berlín",
      price: 190,
    },
    barcelona: {
      name: "Hotel Barcelona",
      price: 210,
    },
    tokyo: {
      name: "Hotel Tokio",
      price: 230,
    },
    sydney: {
      name: "Hotel Sídney",
      price: 260,
    },
    beijing: {
      name: "Hotel Pekín",
      price: 240,
    },
    riodejaneiro: {
      name: "Hotel Río de Janeiro",
      price: 280,
    },
    cancun: {
      name: "Hotel Cancún",
      price: 270,
    },
    dubai: {
      name: "Hotel Dubái",
      price: 320,
    },
  };

  const handleSuggestionClick = (hotelSlug) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const text = block.getText();

    const prefix = text.slice(0, text.indexOf("{{hotels.") + 9);
    const newContent = ContentState.createFromText(`${prefix}${hotelSlug}.`);
    const newEditorState = EditorState.push(editorState, newContent);
    setEditorState(newEditorState);
    editorRef.current.focusEditor();
    setSuggestions([]);
  };

  function convertPlaceholder(contentState) {
    let newText = contentState.getPlainText();
    let matches = newText.match(/{{hotels\.(.*?)\.(name|price)}}/g);

    if (matches) {
      matches.forEach((match) => {
        const keys = match.match(/{{hotels\.(.*?)\.(name|price)}}/);
        if (keys && keys[1] && keys[2]) {
          const hotelSlug = keys[1];
          const property = keys[2];
          const hotel = hotels[hotelSlug];
          if (hotel) {
            const replacement = property === "name" ? hotel.name : hotel.price;
            newText = newText.replace(match, replacement);
          }
        }
      });

      const newContent = ContentState.createFromText(newText);
      return newContent;
    }

    return contentState;
  }

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const contentState = newEditorState.getCurrentContent();
    const selection = newEditorState.getSelection();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const text = block.getText();

    if (text.includes("{{hotels.")) {
      const query = text.slice(text.indexOf("{{hotels.") + 9);
      const matches = Object.keys(hotels).filter((slug) =>
        slug.includes(query)
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-10 p-10 min-h-fa-star-and-crescent bg-slate-100">
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          onBlur={() => {
            const contentState = editorState.getCurrentContent();
            const newContentState = convertPlaceholder(contentState);
            const newEditorState = EditorState.push(
              editorState,
              newContentState
            );
            setEditorState(newEditorState);
          }}
          ref={editorRef}
          editorClassName="bg-white min-h-[10rem]"
        />
        {JSON.stringify(suggestions)}
        {suggestions.length > 0 && (
          <div className="absolute p-5 shadow-sm">
            <ul>
              {suggestions.map((slug) => (
                <li key={slug} onClick={() => handleSuggestionClick(slug)}>
                  {hotels[slug].name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <ViewerEditor content={convertFromRaw(editorState)} />
      </div>
    </div>
  );
}

export default DynamicEditor;
