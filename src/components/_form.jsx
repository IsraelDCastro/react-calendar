import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import SelectMultiple from "./selectMultple";
import { companies } from "../fakedata";
import GalleryForm from "./galleryForm";

export default function PostForm() {

  const postFormik = useFormik({
    initialValues: {
      title: "",
      caption: "",
      post_platform: "",
      date: "",
      status: "",
      companies: "",
      visibility: "",
      post_type: "",
      image_gallery: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Título es requerido.")
        .min(5, "Debe tener más de 5 carácteres."),
      caption: Yup.string()
        .required("Caption es requerido.")
        .min(5, "Debe tener más de 5 carácteres."),
      post_platform: Yup.string().required(
        "Plataforma para publicar es requerida."
      ),
      date: Yup.date().required("Fecha de publicación es requerida."),
      status: Yup.string().required("Estado es requerido."),
      companies: Yup.array(), // .required("Al menos una compañía es requerida."),
      post_type: Yup.string().required("Tipo de publicación es requerida."),
      visibility: Yup.string().required("Visibilidad es requerida."),
      image_gallery: Yup.string().required("Al menos una imagen es requerida."),
    }),
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  const handleFormDataChange = async (event) => {
    postFormik.setFieldValue("image_gallery", event.value.files);
  };

  return (
    <form
      onSubmit={postFormik.handleSubmit}
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      <div>
        <div className="field">
          <Input
            isRequired
            labelPlacement="outside"
            type="text"
            name="title"
            label="Título"
            classNames={{
              label: "text-base",
            }}
            placeholder="Título para el post"
            onChange={postFormik.handleChange}
            onBlur={postFormik.handleBlur}
            value={postFormik.values.title}
            color={
              postFormik.touched.title && postFormik.errors.title
                ? "danger"
                : ""
            }
            errorMessage={
              postFormik.touched.title &&
              postFormik.errors.title &&
              postFormik.errors.title
            }
          />
        </div>
        <div className="field">
          <Textarea
            isRequired
            label="Caption"
            labelPlacement="outside"
            name="caption"
            classNames={{
              label: "text-base",
            }}
            placeholder="Contenido del post"
            onChange={postFormik.handleChange}
            onBlur={postFormik.handleBlur}
            value={postFormik.values.caption}
            color={
              postFormik.touched.caption && postFormik.errors.caption
                ? "danger"
                : ""
            }
            errorMessage={
              postFormik.touched.caption &&
              postFormik.errors.caption &&
              postFormik.errors.caption
            }
          />
        </div>
        <div className="field">
          <GalleryForm
            backendName="image_gallery"
            isMultiple
            onChange={handleFormDataChange}
          />
        </div>
      </div>
      <div>
        <div className="field">
          <RadioGroup
            isRequired
            name="post_platform"
            onChange={postFormik.handleChange}
            orientation="horizontal"
            label="Seleccione el estado"
            classNames={{
              label: "text-gray-700 font-medium",
            }}
            color={
              postFormik.errors.post_platform
                ? "danger"
                : "primary"
            }
            defaultValue={postFormik.values.post_platform}
            value={postFormik.values.post_platform}
            errorMessage={
              postFormik.errors.post_platform &&
              postFormik.errors.post_platform
            }
          >
            <Radio value="facebook">
              <i className="fa-brands fa-facebook-f" />
            </Radio>
            <Radio value="instagram">
              <i className="fa-brands fa-instagram" />
            </Radio>
            <Radio value="tiktok">
              <i className="fa-brands fa-tiktok" />
            </Radio>
            <Radio value="youtube">
              <i className="fa-brands fa-youtube" />
            </Radio>
            <Radio value="linkedin">
              <i className="fa-brands fa-linkedin-in" />
            </Radio>
            <Radio value="pinterest">
              <i className="fa-brands fa-pinterest-p" />
            </Radio>
            <Radio value="x_twitter" label="hola">
              <i className="fa-brands fa-x-twitter" />
            </Radio>
          </RadioGroup>
        </div>
        <div className="field">
          <Input
            isRequired
            labelPlacement="outside"
            type="date"
            name="date"
            label="Fecha"
            classNames={{
              label: "text-base",
            }}
            placeholder="Fecha en que se debe publicar"
            onChange={postFormik.handleChange}
            onBlur={postFormik.handleBlur}
            value={postFormik.values.date}
            color={
              postFormik.touched.date && postFormik.errors.date ? "danger" : ""
            }
            errorMessage={
              postFormik.touched.date &&
              postFormik.errors.date &&
              postFormik.errors.date
            }
          />
        </div>
        <div className="field">
          <RadioGroup
            isRequired
            name="status"
            onChange={postFormik.handleChange}
            orientation="horizontal"
            label="Seleccione el estado"
            classNames={{
              label: "text-gray-700 font-medium",
            }}
            color={postFormik.errors.status
                ? "danger"
                : "primary"
            }
            defaultValue={postFormik.values.status}
            value={postFormik.values.status}
            errorMessage={
              postFormik.errors.status &&
              postFormik.errors.status
            }
          >
            <Radio value="draft">Borrador</Radio>
            <Radio value="pending_review">Pendiente a revisar</Radio>
            <Radio value="published">Publicado</Radio>
            <Radio value="customer_changes">Cambios del cliente</Radio>
            <Radio value="approved">Aprovado</Radio>
          </RadioGroup>
        </div>
        <div className="field">
          <SelectMultiple
            label="Compañía"
            placeholder="Selecciona la compañía"
            options={companies}
            name="companies"
            values={postFormik.values.companies}
            dataFormik={postFormik}
            isMultiple
          />
        </div>
        <div className="field">
          <RadioGroup
            isRequired
            name="visibility"
            onChange={postFormik.handleChange}
            orientation="horizontal"
            label="Seleccione la visibilidad"
            classNames={{
              label: "text-gray-700 font-medium",
            }}
            color={ postFormik.errors.visibility
                ? "danger"
                : "primary"
            }
            defaultValue={postFormik.values.visibility}
            value={postFormik.values.visibility}
            errorMessage={
              postFormik.errors.visibility &&
              postFormik.errors.status
            }
          >
            <Radio value="public">Publico</Radio>
            <Radio value="private">Privada</Radio>
          </RadioGroup>
        </div>
        <div className="field">
          <RadioGroup
            isRequired
            name="post_type"
            onChange={postFormik.handleChange}
            orientation="horizontal"
            label="Tipo de publicación"
            classNames={{
              label: "text-gray-700 font-medium",
            }}
            color={postFormik.errors.post_type
                ? "danger"
                : "primary"
            }
            defaultValue={postFormik.values.post_type}
            value={postFormik.values.post_type}
            errorMessage={
              postFormik.errors.post_type &&
              postFormik.errors.post_type
            }
          >
            <Radio value="post">Publicación/post</Radio>
            <Radio value="phrase">Frase</Radio>
            <Radio value="reel">Reel</Radio>
            <Radio value="blog_post">Blog post</Radio>
            <Radio value="video">Video</Radio>
          </RadioGroup>
        </div>
      </div>

      <div className="justify-end field field-button">
        <Button onClick={postFormik.handleSubmit} color="primary">
          Añadir post
        </Button>
      </div>
    </form>
  );
}
