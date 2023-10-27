import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import PostForm from "./_form";

export default function ModalCalendarForm({ onOpenChange, isOpen }) {
  return (
    <Modal
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      onOpenChange={onOpenChange}
      size="4xl"
      placement="top-center"
      isOpen={isOpen}
    >
      <ModalContent className="bg-slate-50 h-[90%] flex flex-wrap flex-col">
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between w-full px-8 pt-8 border-b">
              <h4 className="font-medium">Añadir nuevo post</h4>
            </ModalHeader>
            <ModalBody className="flex-1 px-8 py-4 h-[90%] overflow-y-auto w-full">
              <PostForm />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="bordered" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="success">Actualizar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

ModalCalendarForm.propTypes = {
  onOpenChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};
