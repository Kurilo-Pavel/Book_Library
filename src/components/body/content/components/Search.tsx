import "./search.scss";
import Button from "../../../components/Button";
import InputText from "../../../components/InputText";
import {addData, openFile} from "../../../../store/filesSlice/filesSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useState} from "react";


const Search = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    await dispatch(addData({name: name, author: author, date: new Date()}));
    await dispatch(openFile("library/documents/books.txt"));
  }

  return (
    <div className="search">
      <InputText labelText="Name" value={name} setValue={setName}/>
      <InputText labelText="Author" value={author} setValue={setAuthor}/>
      <Button
        buttonType="button"
        buttonName="Add"
        buttonClass=""
        buttonClick={handleAdd}
      />
    </div>
  );
};

export default Search;