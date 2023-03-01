import "./books.scss";
import {deleteBook} from "../../../../store/filesSlice/filesSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useState} from "react";
import classNames from "classnames";
import Button from "../../../components/Button";
import ModalEdit from "../../../components/ModalEdit";

const Books = () => {
  const [selectBook, setSelectBook] = useState({name: "", author: "", id: 0, date: new Date()});
  const [isModalClose, setIsModalClose] = useState(true);
  const contentFile = useAppSelector(state => state.files.contentFile);
  const collection = contentFile.split("/");
  const formatter = new Intl.DateTimeFormat("ru");
  const dispatch = useAppDispatch();

  const handleSelect = (data) => {
    setSelectBook(data);
  };

  const handleEdit = () => {
    setIsModalClose(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteBook(selectBook.id));
    setSelectBook({name: "", author: "", id: 0, date: new Date()})
  };

  return (
    <div className="table">
      <div className="main__row">
        <div className="table__column">ID</div>
        <div className="table__column">Name book</div>
        <div className="table__column">Author</div>
        <div className="table__column">Date</div>
      </div>

      {collection.map(column => {
        const dataColumn = column ? JSON.parse(column) : null;
        if (dataColumn) {
          return (
            <div
              className={classNames("main__row book__row", {"book__select": dataColumn.id === selectBook.id})}
              key={dataColumn.id}
              onClick={(event) => {
                handleSelect(dataColumn)
              }}
            >
              <div className="book__column">{dataColumn.id ? dataColumn.id : null}</div>
              <div className="book__column">{dataColumn.name ? dataColumn.name : null}</div>
              <div className="book__column">{dataColumn.author ? dataColumn.author : null}</div>
              <div className="book__column">{dataColumn.date ? formatter.format(new Date(dataColumn.date)) : null}</div>
            </div>
          )
        }
      })}
      <div className="button_field">
        <Button
          buttonType="button"
          buttonClass=""
          buttonClick={handleEdit}
          buttonName="Edit"
        />
        <Button
          buttonType="button"
          buttonClass=""
          buttonClick={handleDelete}
          buttonName="Delete"
        />
      </div>
      {!isModalClose && <ModalEdit
        bookName={selectBook.name}
        bookAuthor={selectBook.author}
        bookId={selectBook.id}
        setIsModalClose={setIsModalClose}
      />}
    </div>
  )
}
export default Books;