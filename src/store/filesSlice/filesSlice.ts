import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getFiles = createAsyncThunk(
  "files/getFilesSlice",
  async (url: string) => {
    const responce = await fetch(`/files/${url}`);
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      return `error ${responce.status}`;
    }
  }
);

export const openFile = createAsyncThunk(
  "files/openFileSlice",
  async (url: string) => {
    const responce = await fetch(`/readFile/${url}`);
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      return `error ${responce.status}`;
    }
  }
);
export const addData = createAsyncThunk(
  "file/addDataSlice",
  async (value: { name: string, author: string, date: Date }) => {
    const response = await fetch("/writeFile/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: value.name, author: value.author, date: value.date})
    });
    const data = await response;
  }
);

export const deleteBook = createAsyncThunk(
  "file/deleteBookSlice",
  async (id: number) => {
    const response = await fetch(`/deleteBook/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
    return data;
  }
);

export const editBook = createAsyncThunk(
  "file/editBookSlice",
  async (dataBook:{id: number, name: string, author: string}) => {
    const response = await fetch(`/editBook/${dataBook.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: dataBook.name, author: dataBook.author})
    });
    const data = await response.json();
    return data;
  }
)

type Files = {
  data: {
    path: string;
    files: [{
      name: string,
      isFile: boolean | undefined;
    }];
  };
  contentFile: string;
};

const initialState: Files = {
  data: {
    path: "",
    files: [{
      name: "",
      isFile: undefined,
    }],
  },
  contentFile: "",
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFiles.fulfilled, (state, action) => {
      if (typeof action.payload !== "string") {
        state.data = action.payload;
      }
    });
    builder.addCase(openFile.fulfilled, (state, action) => {
      state.contentFile = action.payload;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.contentFile = action.payload;
    });
    builder.addCase(editBook.fulfilled, (state, action)=>{
      state.contentFile = action.payload;
    });
  }
});

export default filesSlice.reducer;