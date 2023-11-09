import { useEffect, useRef, useState } from "react";
import { EditorState, Modifier } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ViewerEditor from "./viewerEditor";
import { Button } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import InputSearch from "./components/inputSearch";
import FadeIn from "./components/fadeIn";

function SetHotelName({ hotels, getValueInput }) {
  const [displayNames, setDisplayNames] = useState(false);
  const hotelInputRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (hotelInputRef.current && !hotelInputRef.current.contains(event.target)) {
        setDisplayNames(false);
      }
    });
  }, []);
  return (
    <div ref={hotelInputRef} className="relative mb-1">
      <Button
        onClick={() => setDisplayNames(!displayNames)}
        variant="flat"
        size="sm"
      >
        Hotel names
        <i className="fa-solid fa-hotel" />
      </Button>
      <AnimatePresence mode="wait">
        {displayNames && (
          <FadeIn className="absolute z-50 p-5 mt-2 bg-white shadow-md top-full w-72">
            <InputSearch
              label="Hotel names"
              placeholder="Choose hotel name"
              options={hotels}
              name="hotel_names"
              getValueInput={getValueInput}
            />
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}

function SetHotelPrice({ hotels, getValueInput }) {
  const [displayNames, setDisplayNames] = useState(false);
  const hotelInputRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (
        hotelInputRef.current &&
        !hotelInputRef.current.contains(event.target)
      ) {
        setDisplayNames(false);
      }
    });
  }, []);
  return (
    <div ref={hotelInputRef} className="relative mb-1 ml-2">
      <Button
        onClick={() => setDisplayNames(!displayNames)}
        variant="flat"
        size="sm"
      >
        Hotel prices
        <i className="fa-solid fa-hotel" />
      </Button>
      <AnimatePresence mode="wait">
        {displayNames && (
          <FadeIn className="absolute z-50 p-5 mt-2 bg-white shadow-md top-full w-72">
            <InputSearch
              label="Hotel prices"
              placeholder="Choose hotel price"
              options={hotels}
              name="hotel_prices"
              getValueInput={getValueInput}
            />
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}

function RichTextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [hotels, setHotels] = useState([]);
  const editorRef = useRef(null);
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const textPlaceholder = `{{hotels.a_doloribus_hic.name}} {{hotels.nueva_york.name}} ¡Bienvenido a nuestro sitio web de reservas de hoteles! Aquí puedes encontrar los mejores hoteles para tus próximas vacaciones.
- ¿Estás planeando un viaje a California? No te pierdas el increíble {{hotels.california.name}}. Puedes reservar a partir desde {{hotels.california.price}} por noche. ¡Una oferta que no puedes dejar pasar!
- Si tu destino es Madrid, te recomendamos el {{hotels.madrid.name}}. Disfruta de una estancia increíble a partir desde {{hotels.madrid.price}} por noche.
- ¿París te está llamando? Elige el {{hotels.paris.name}} para tu estancia a partir desde {{hotels.paris.price}} por noche.
- Si prefieres una aventura en Roma, el {{hotels.roma.name}} es tu mejor opción a partir desde {{hotels.roma.price}} por noche.
- Nueva York, la ciudad que nunca duerme, te espera con el {{hotels.nueva_york.name}} a partir desde {{hotels.nueva_york.price}} por noche.
- Miami es un paraíso, y el {{hotels.miami.name}} es perfecto para tu escapada a partir desde {{hotels.miami.price}} por noche.
- Londres es una ciudad fascinante, y el {{hotels.london.name}} te ofrece una estancia a partir desde {{hotels.london.price}} por noche.
- Berlín tiene una rica historia y cultura, y el {{hotels.berlin.name}} es una excelente elección a partir desde {{hotels.berlin.price}} por noche.
- Si prefieres el sol de Barcelona, el {{hotels.barcelona.name}} es una gran opción a partir desde {{hotels.barcelona.price}} por noche.
- Tokio te ofrece una experiencia única, y el {{hotels.tokio.name}} está disponible a partir desde {{hotels.tokio.price}} por noche.
- Sídney es una joya de Australia, y el {{hotels.sydney.name}} es perfecto a partir desde {{hotels.sydney.price}} por noche.
- Si quieres descubrir Pekín, el {{hotels.pekin.name}} te espera a partir desde {{hotels.pekin.price}} por noche.
- Río de Janeiro es famosa por su belleza, y el {{hotels.rio_de_janeiro.name}} es una excelente elección a partir desde {{hotels.rio_de_janeiro.price}} por noche.
- Disfruta del paraíso en Cancún con el {{hotels.cancun.name}} a partir desde {{hotels.cancun.price}} por noche.
- Si buscas lujo en Dubái, el {{hotels.dubai.name}} es una opción de primera a partir desde {{hotels.dubai.price}} por noche.
¡Reserva tu estancia en uno de estos increíbles hoteles y asegúrate de tener unas vacaciones inolvidables!`;

  const getHotels = async () => {
    try {
      const response = await fetch("http://localhost:3000/hotels");
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

  const getValueInput = (value, price) => {
    const selection = editorState.getSelection();

    const contentState = editorState.getCurrentContent();
    let newContentState = null;
    if (price) {
      newContentState = Modifier.insertText(
        contentState,
        selection,
        `{{hotels.${value.slug}.price}}`
      );
    } else {
      newContentState = Modifier.insertText(
        contentState,
        selection,
        `{{hotels.${value.slug}.name}}`
      );
    }

    const newEditorState = EditorState.push(editorState, newContentState);

    setEditorState(newEditorState);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHotels();
      setHotels(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setEditorState(EditorState.createWithText(textPlaceholder));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-10 p-10 min-h-fa-star-and-crescent bg-slate-100">
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          onBlur={() => {
            const contentState = editorState.getCurrentContent();
            const newEditorState = EditorState.push(editorState, contentState);
            setEditorState(newEditorState);
          }}
          ref={editorRef}
          editorClassName="bg-white min-h-[10rem]"
          too
          toolbarCustomButtons={[
            <SetHotelName
              hotels={hotels}
              key="set-hotel-name"
              getValueInput={getValueInput}
            />,
            <SetHotelPrice hotels={hotels}
              key="set-hotel-price"
              getValueInput={(value) => getValueInput(value, "price")} />
          ]}
        />
      </div>
      <div>
        <ViewerEditor content={editorState} />
      </div>
    </div>
  );
}

export default RichTextEditor;
