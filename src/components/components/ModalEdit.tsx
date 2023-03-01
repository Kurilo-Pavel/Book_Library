import "./modalEdit.scss";
import Button from "./Button";
import InputText from "./InputText";
import {useState} from "react";
import {editBook} from "../../store/filesSlice/filesSlice";
import {useAppDispatch} from "../../store/hooks";

type ModalEditProp = {
  bookName: string;
  bookAuthor: string;
  bookId: number;
  setIsModalClose: (boolean: boolean) => void;
}

const ModalEdit = ({bookName, bookAuthor, bookId, setIsModalClose}: ModalEditProp) => {
  const dispath = useAppDispatch();
  const [name, setName] = useState(bookName);
  const [author, setAuthor] = useState(bookAuthor);
  const handleEdit = async () => {
    if (bookId !== 0) {
      await dispath(editBook({id: bookId, name: name, author: author}));
      setIsModalClose(true);
    }
  }
  return <div className="modal__wrapper">
    <div className="modal">
      <div className="field-close" onClick={() => setIsModalClose(true)}>
        <span className="close-modal"/>
      </div>
      <InputText
        labelText="Name"
        setValue={setName}
        value={name}
      />
      <InputText
        labelText="Author"
        setValue={setAuthor}
        value={author}
      />
      <Button
        buttonType="button"
        buttonName="Edit"
        buttonClass=""
        buttonClick={handleEdit}
      />
    </div>
  </div>
}
export default ModalEdit;