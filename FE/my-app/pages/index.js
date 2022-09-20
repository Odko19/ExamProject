import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import useSWR from "swr";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import moment from "moment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import InputAdornment from "@mui/material/InputAdornment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.gray,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    height: "100vh",
    width: "100vw",
    color: "red",
  },
};

const title = [
  "Name",
  "Code",
  "Price",
  "Authors",
  "ISBN",
  "Publisher",
  "Published on",
];

export default function Home() {
  const [books, setBooks] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = (data) => {
    setEdit(data);
    setOpen(true);
  };
  const handleClose1 = () => setOpen(false);
  //   React.useEffect(() => {
  //     axios
  //       .get("http://localhost:3000/v1")
  //       .then((res) => console.log(res.data.data))
  //       .catch((err) => console.log(err));
  //   }, [])

  //   All data
  const usersApi = "http://localhost:3000/v1";
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const { data, error, mutate } = useSWR(usersApi, fetcher);
  console.log(data);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/v1/${edit._id}`, {
        book_name: e.target.name.value,
        book_Price: e.target.price.value,
        book_Author: e.target.authors.value,
        book_ISBN: e.target.ISBN.value,
        book_Published: e.target.Published.value,
        book_Publisher: e.target.Publisher.value,
        book_Code: e.target.code.value,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("update");
          setOpen(false);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSubmitCreate(e) {
    e.preventDefault();
    console.log(e.target.Published.value);
    axios
      .post(`http://localhost:3000/v1`, {
        book_name: e.target.name.value,
        book_Price: e.target.price.value,
        book_Author: e.target.authors.value,
        book_ISBN: e.target.ISBN.value,
        book_Published: e.target.Published.value,
        book_Publisher: e.target.Publisher.value,
        book_Code: e.target.code.value,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("create");
          setOpen1(false);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleDlt(id) {
    axios
      .delete(`http://localhost:3000/v1/${id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("delete");
          mutate();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div style={style.content}>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{ borderBottom: "0.5px solid gray" }}>
              <TableRow>
                {title.map((title, i) => {
                  return <StyledTableCell key={i}>{title}</StyledTableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((data, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {data.book_Author}
                      </StyledTableCell>
                      <StyledTableCell>{data.book_Code}</StyledTableCell>
                      <StyledTableCell>{data.book_Price}</StyledTableCell>
                      <StyledTableCell>{data.book_name}</StyledTableCell>

                      <StyledTableCell>{data.book_ISBN}</StyledTableCell>
                      <StyledTableCell>{data.book_Publisher}</StyledTableCell>
                      <StyledTableCell>
                        {moment(data.book_Published).format("YYYY - MM - DD")}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button onClick={() => handleOpen1(data)}>
                          <EditIcon />
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button onClick={() => handleDlt(data._id)}>
                          <DeleteIcon />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          sx={{ marginTop: "20px", marginLeft: "35vw" }}
          onClick={handleOpen1}
        >
          <AddIcon /> Add Book
        </Button>
      </Container>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            sx={style.modal}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", marginBottom: "20px" }}
            >
              Edit Book
            </Typography>
            <TextField
              id="standard-basic"
              label="name"
              variant="outlined"
              name="name"
              defaultValue={edit?.book_name}
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="code"
              variant="outlined"
              name="code"
              defaultValue={edit?.book_Code}
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="price"
              variant="outlined"
              name="price"
              defaultValue={edit?.book_Price}
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="authors"
              variant="outlined"
              name="authors"
              defaultValue={edit?.book_Author}
              sx={{ width: "100%", marginBottom: "20px" }}
            />

            <TextField
              id="standard-basic"
              label="ISBN"
              variant="outlined"
              name="ISBN"
              defaultValue={edit?.book_ISBN}
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="Publisher"
              variant="outlined"
              name="Publisher"
              defaultValue={edit?.book_Publisher}
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="Published on"
              variant="outlined"
              name="Published"
              type="date"
              defaultValue={edit?.book_Published}
              sx={{ width: "100%", marginBottom: "20px", marginBottom: "40px" }}
            />
            <button>update</button>
          </Box>
        </Modal>

        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            sx={style.modal}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitCreate}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", marginBottom: "20px" }}
            >
              Add Book
            </Typography>
            <TextField
              id="standard-basic"
              label="name"
              variant="outlined"
              name="name"
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="code"
              variant="outlined"
              name="code"
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="price"
              variant="outlined"
              name="price"
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="authors"
              variant="outlined"
              name="authors"
              sx={{ width: "100%", marginBottom: "20px" }}
            />

            <TextField
              id="standard-basic"
              label="ISBN"
              variant="outlined"
              name="ISBN"
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="Publisher"
              variant="outlined"
              name="Publisher"
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              id="standard-basic"
              label="Published on"
              variant="outlined"
              name="Published"
              type="date"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "100%", marginBottom: "20px", marginBottom: "40px" }}
            />
            <button>Update</button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
