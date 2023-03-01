import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import Folder from "../../../icons/folder.png";
import {getFiles,openFile} from "../../../store/filesSlice/filesSlice";
import {useEffect, useState} from "react";
import Button from "../../components/Button";

type DirrectoryProps = {
  path: string;
  isOpenDirection?: boolean;
}
const Directory = ({path, isOpenDirection}: DirrectoryProps) => {
  const [isOpenDirectory, setIsOpenDirectory] = useState<boolean>(false);
  const data = useAppSelector(state => state.files.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (path === "library") {
      setIsOpenDirectory(true);
      dispatch(getFiles(path));
    }
  }, [dispatch, path]);

  const clickDirectory = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    if (!isOpenDirectory || path === "library") {
      setIsOpenDirectory(true);
      dispatch(getFiles(id));
    } else {
      dispatch(getFiles(id));
    }
  };

  const handleBack = () => {
    const pathArray = data.path.split("/");
    const path = pathArray.slice(0, pathArray.length - 1).join("/");
    dispatch(getFiles(path));
  };

  return (
    <div>
      <span>{data.path}</span>
      <ul>
        {isOpenDirectory && data.files.map(file => {
          if (file.isFile === false) {
            return (
              <div key={file.name}>
                <li id={data.path + "/" + file.name} onClick={clickDirectory}>
                  <img src={Folder} className="icons__folder" alt="folder"/>
                  {file.name}
                </li>
              </div>
            )
          } else {
            return <li
              id={data.path + "/" + file.name}
              key={file.name}
              onClick={(event)=>{dispatch(openFile(event.currentTarget.id))}}
            >
              {file.name}
            </li>
          }
        })}
      </ul>
      <Button
        buttonClick={handleBack}
        buttonName="Back"
        buttonType="button"
        buttonClass=""
      />
    </div>
  )
}

export default Directory;