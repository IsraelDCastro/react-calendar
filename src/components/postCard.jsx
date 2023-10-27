import { Card, CardFooter, Chip, Image } from "@nextui-org/react";
import PropTypes from "prop-types";

PostCard.propTypes = {
  post: PropTypes.shape({
    image_gallery: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    post_platform: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default function PostCard({ post }) {

  const displayPostPlafform = (post_platform) => {
    if (post_platform === "facebook") return "fa-brands fa-facebook-f";
    if (post_platform === "instagram") return "fa-brands fa-instagram";
    if (post_platform === "tiktok") return "fa-brands fa-tiktok";
    if (post_platform === "youtube") return "fa-brands fa-youtube";
    if (post_platform === "linkedin") return "fa-brands fa-linkedin-in";
    if (post_platform === "pinterest") return "fa-brands fa-pinterest-p";
    if (post_platform === "x_twitter") return "fa-brands fa-x-twitter";
    return "fa-regular fa-circle-question";
  }

  const displayStatus = (status) => {
    if (status === "approved") return "success";
    if (status === "pending") return "warning";
    if (status === "published") return "primary";
    if (status === "draft") return "secondary";
    if (status === "customer_changes") return "danger";
    return "default"
  }

  return (
    <Card isPressable shadow="none" className="border-none aspect-[16/12]">
      <Image
        alt="Woman listing to music"
        className="object-cover object-center w-full h-full"
        src={post.image_gallery[0]}
        classNames={{
          wrapper: "h-full",
        }}
      />
      <Chip
        color={displayStatus(post.status)}
        className="absolute z-20 flex items-center justify-center w-8 h-8 p-0 text-lg text-white rounded-full max-w-none right-2 top-2"
        classNames={{
          wrapper: "w-8 h-8",
        }}
      >
        <i className={`${displayPostPlafform(post.post_platform)}`} />
      </Chip>
      <CardFooter className="absolute inset-0 z-10 text-left items-end overflow-hidden leading-none bg-black/20 backdrop-blur-[2px] rounded-large">
        <h6 className="text-lg text-white">{post.title}</h6>
      </CardFooter>
    </Card>
  );
}