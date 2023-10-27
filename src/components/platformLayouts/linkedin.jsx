import PropTypes from "prop-types";

export default function LinkedIn({ post }) {
  return (
    <div className="bg-white text-slate-600">
      <div className="px-5 pt-5 mb-2 space-y-2">
        <p>{post.title}</p>
        <p>{post.caption}</p>
      </div>
      <figure className="overflow-hidden">
        <img src={post.image_gallery[0]} alt={post.title} />
      </figure>
    </div>
  );
}

LinkedIn.propTypes = {
  post: PropTypes.shape({
    image_gallery: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    caption: PropTypes.string,
    post_platform: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

