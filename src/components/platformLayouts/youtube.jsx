import { RadioGroup, Radio } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Youtube({ post }) {
  const [postType, setPostType] = useState("video");
  return (
    <div>
      <div className="p-5 bg-white text-slate-600">
        <RadioGroup
          isRequired
          name="post_type"
          orientation="horizontal"
          className="mb-8"
          label="Seleccione el post type"
          classNames={{
            label: "text-gray-700 font-medium",
          }}
          value={postType}
          onChange={(event) => {
            setPostType(event.target.value);
          }}
        >
          <Radio value="video">Video</Radio>
          <Radio value="short">Short</Radio>
        </RadioGroup>
        {postType === "short" && (
          <video controls className="rounded-xl" autoPlay>
            <source src="/short-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {postType === "video" && (
          <video controls className="rounded-xl" autoPlay>
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="mt-4 mb-4 space-y-2 text-sm">
          <h4 className="text-2xl">{post.title}</h4>
          <p>Innovacode</p>
        </div>
      </div>
    </div>
  );
}

Youtube.propTypes = {
  post: PropTypes.shape({
    image_gallery: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    caption: PropTypes.string,
    post_platform: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  post_type: PropTypes.string,
};
