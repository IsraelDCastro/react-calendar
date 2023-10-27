import { useState } from "react";
import XTwitter from "./platformLayouts/xTwitter"
import { format, parseISO } from "date-fns";
import esLocale from "date-fns/locale/es";
import { Button, RadioGroup, Radio } from "@nextui-org/react";
import Facebook from "./platformLayouts/facebook";
import Instagram from "./platformLayouts/instagram";
import TikTok from "./platformLayouts/tiktok";
import Youtube from "./platformLayouts/youtube";
import LinkedIn from "./platformLayouts/linkedin";
import Pinterest from "./platformLayouts/pinteresr";

export default function PostLayout() {
  const [postType, setPostType] = useState("image")
  const [post, setPost] = useState({
    title: "Why barbie is now a good trending to marketing?",
    caption:
      "#Barbie has been evolving with the times and becoming more inclusive and representative of diversity. Brands recognize the power of the Barbie brand and her ability to resonate with fans new and old. #Progressive #Inclusive #Diversity #BrandMarketing #CultureChange #RoleModels #Empowerment #RepresentationMatters #ForwardThinking #Relevant",
    image_gallery: ["https://picsum.photos/1280/720?random=1"],
    post_platform: "facebook",
    date: "2023-10-31",
    status: "published",
    visibility: false,
    post_type: "post",
  });
  const displayPostPlatform = (platform) => {
    if (post.post_platform === "facebook") return "Facebook";
    if (post.post_platform === "instagram") return "Instagram";
    if (post.post_platform === "tiktok") return "TikTok";
    if (post.post_platform === "youtube") return "Youtube";
    if (post.post_platform === "linkedin") return "LinkedIn";
    if (post.post_platform === "pinterest") return "Pinterest";
    if (post.post_platform === "x_twitter") return "X/Twitter"
    return "No especificado";
  }
  const getDate = (date) => {
    return format(parseISO(date.split("T")[0]), "PPP", { locale: esLocale });
  };
  return (
    <section className="flex flex-col items-center justify-center w-full p-10 bg-slate-50">
      <div className="p-5 mb-5 bg-white md:w-8/12 lg:w-6/12 rounded-2xl">
        <RadioGroup
          isRequired
          name="post_platform"
          orientation="horizontal"
          label="Seleccione la plataforma"
          classNames={{
            label: "text-gray-700 font-medium",
          }}
          value={post.post_platform}
          onChange={(event) => {
            setPost((prevState) => ({
              ...prevState,
              post_platform: event.target.value,
            }));
          }}
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
        {post.post_platform === "instagram" && (
          <RadioGroup
            isRequired
            name="post_type"
            orientation="horizontal"
            label="Seleccione el post type"
            classNames={{
              label: "text-gray-700 font-medium",
            }}
            value={postType}
            onChange={(event) => {
              setPostType(event.target.value);
            }}
          >
            <Radio value="image">Imagen</Radio>
            <Radio value="reel">Reel</Radio>
          </RadioGroup>
        )}
      </div>
      <div className="grid w-10/12 grid-cols-2 mx-auto bg-slate-100 md:w-8/12 lg:w-6/12 rounded-2xl">
        {post.post_platform === "facebook" && <Facebook post={post} />}
        {post.post_platform === "instagram" && (
          <Instagram post={post} post_type={postType} />
        )}
        {post.post_platform === "tiktok" && (
          <TikTok post={post} />
        )}
        {post.post_platform === "youtube" && <Youtube post={post} />}
        {post.post_platform === "linkedin" && <LinkedIn post={post} />}
        {post.post_platform === "pinterest" && <Pinterest post={post} />}
        {post.post_platform === "x_twitter" && <XTwitter post={post} />}
        <div className="p-8 space-y-5 text-slate-600">
          <h6 className="text-lg font-semibold">
            Plataforma para publicar:
            <small className="block text-base font-normal">
              Este post será publicacdo en{" "}
              <span className="font-bold text-sky-600">
                {displayPostPlatform(post.post_platform)}
              </span>
            </small>
          </h6>
          <h6 className="text-lg font-semibold">
            Fecha de publicación:
            <small className="block text-base font-normal">
              Este post será publicacdo el día{" "}
              <span className="font-bold text-sky-600">
                {getDate(post.date)}
              </span>
            </small>
          </h6>
          <span className="text-xs text-slate-400">
            Quedan 10 días para aprobar una solicitud de cambios para esta
            publicación.
          </span>
          <h6 className="text-lg font-semibold">
            Tipo de publicación:
            <small className="block text-base font-normal">
              Publicación/post
            </small>
          </h6>
          <div className="space-y-2 text-gray-500">
            <p>
              Lorem ipsum dolor sit amet consectetur. Lectus consectetur duis
              vel vulputate non ultrices donec faucibus. Tincidunt urna leo
              turpis at suscipit amet.
            </p>
            <p>
              At neque suspendisse sit diam vulputate sem feugiat ullamcorper.
              Sit rhoncus rutrum vivamus mauris faucibus.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 !mt-8 md:justify-between">
            <Button variant="bordered" color="primary">
              Solicitar cambios
            </Button>
            <Button color="primary">Aprovar</Button>
          </div>
        </div>
      </div>
    </section>
  );
}