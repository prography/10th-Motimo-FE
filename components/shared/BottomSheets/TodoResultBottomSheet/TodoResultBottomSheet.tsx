import { Drawer } from "vaul";
interface TodoResultBottomSheetProps {
  openModal: boolean;
}
const TodoResultBottomSheet = ({ openModal }: TodoResultBottomSheetProps) => {
  return (
    <>
      <Drawer.Root open={openModal}>
        <Drawer.Portal>
          <Drawer.Overlay
            onClick={() => {
              // resetBottomSheet();
            }}
            className="fixed inset-0 bg-black/10 z-10"
          />

          <Drawer.Content
            className={`z-20  h-[585px] relative bg-background-alternative rounded-tl-lg rounded-tr-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.24)] overflow-hidden`}
          ></Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default TodoResultBottomSheet;
