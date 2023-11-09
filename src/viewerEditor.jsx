import React, { useEffect, useState } from "react";
import { Editor, EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function ViewEditor({ content }) {
  const [hotels, setHotels] = useState([])

  const replaceHotelPlaceholders = (editorState) => {
  let contentState = editorState.getCurrentContent();
  let contentText = contentState.getPlainText();

  // Expresión regular para buscar y reemplazar marcadores de posición
  const regex = /{{hotels\.([a-zA-Z0-9_]+)\.(name|price)}}/g;

  // Función de reemplazo para los marcadores de posición
  const replaceFunction = (match, hotelSlug, property) => {
    const hotel = hotels[hotelSlug];
    if (hotel) {
      return property === "name" ? hotel.name : hotel.price;
    }
    return match; // Si no se encuentra un hotel válido, mantener el marcador de posición original
  };

  
  contentText = contentText.replace(regex, replaceFunction);

  
  contentState = ContentState.createFromText(contentText);

  
  const newEditorState = EditorState.createWithContent(contentState);

  return newEditorState;
}
const getHotels = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/hotels/related/hotels"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const processedContent = replaceHotelPlaceholders(content);
useEffect(() => {
  const fetchData = async () => {
    const data = await getHotels();
    setHotels(data);
  };

  fetchData();
}, [])

  
  return (
    <div>
      <Editor editorState={processedContent} readOnly toolbarHidden />
    </div>
  );
}

export default ViewEditor;
