import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";

interface GlobalAlertDialogProps {
  isOpen: boolean;
  cancelRef: React.RefObject<any> | undefined;
  onClose: () => void;
  title: string;
  message: string;
  action: () => void;
  children: React.ReactNode;
}

const GlobalAlertDialog: FC<GlobalAlertDialogProps> = ({
  isOpen,
  cancelRef,
  onClose,
  title,
  message,
  action,
  children,
}) => {
  return (
    <>
      {children}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
            <AlertDialogBody>{message}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={action} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default GlobalAlertDialog;
