import PropTypes from "prop-types";

export default function Pinterest({ post }) {
  return (
    <div>
      <div className="p-5 bg-white text-slate-600">
        <video controls className="rounded-xl" autoPlay>
          <source src="/short-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="mt-4 mb-4 space-y-2 text-sm">
          <h4 className="text-2xl">{post.title}</h4>
          <p>Innovacode</p>
        </div>
      </div>
    </div>
  );
}

Pinterest.propTypes = {
  post: PropTypes.shape({
    image_gallery: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    caption: PropTypes.string,
    post_platform: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  post_type: PropTypes.string,
};
