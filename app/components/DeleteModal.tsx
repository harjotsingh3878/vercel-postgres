import { deleteReferral } from "../api";
import { useRouter } from "next/navigation";

interface IDeleteModalProps {
  modalOpen: number;
  setModalOpen(modalOpen: number): void;
}

const DeleteModal: React.FC<IDeleteModalProps> = ({ modalOpen, setModalOpen }) => {
  const router = useRouter()
  const handleDelete = async () => {
    await deleteReferral(modalOpen);
    setModalOpen(0);
    router.refresh();
  }
  return (
    <dialog id="my_modal_5" className={`modal modal-bottom sm:modal-middle ${ modalOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Referral</h3>
        <p className="py-4">Are you sure, you want to delete this referral?</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={() => setModalOpen(0)} >Close</button>
            <button className="btn btn-error ml-4" onClick={() => handleDelete()} >Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;