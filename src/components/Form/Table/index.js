import React, { useState} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { FaEllipsisV, FaCaretDown, FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import IconButton from '@material-ui/core/IconButton';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import TablePagination from "@material-ui/core/TablePagination";




const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    boxShadow: "none"
  },
  paper: {
    overflowX: "auto"
  },
  sticky: {
    position: "sticky",
    right: 0,
    backgroundColor: "white"
  }
});

const StyledTableCell = withStyles(() => ({
  head: {
    color: "black",
    fontFamily: "Roboto",
    fontWeight: "bold",
    backgroundColor: "white",
    fontSize: "12px",
    zIndex: 0,
  },
  body: {
    color: "gray",
    fontFamily: "Roboto",
    fontSize: "12px",
  }
}))(TableCell);

const theme = createTheme({
  overrides: {
    MuiTableCell: {
      root: {
        paddingTop: 4,
        paddingBottom: 4,
        "&:last-child": {
          paddingRight: 5
        }
      }
    }
  }
});



export default function GenericTable({
  rows,
  headerCells,
  tableMaxWidth,
  hasActions,
  actions,
  totalResultados,
  currentPage,
  onPageChange
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event, row) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <MuiThemeProvider theme={theme}>
          <div className="table-component-container">
            <Paper className={classes.paper} elevation={0}>
              <TableContainer style={{ maxHeight: tableMaxWidth }}>
                <Table
                  fixedHeader={false}
                  stickyHeader
                  className={classes.table}
                  aria-label="simple table"
                  style={{ tableLayout: "auto", width: "100%" }}
                >
                  <TableHead>
                    <TableRow>
                      {headerCells.map((cell) => (
                        <StyledTableCell align="right" >
                          <div className="table-head-cell-caret-icon" style={{ textAlign: "center", lineHeight: "1.05" }}>
                            <p>{cell.title}</p>
                          </div>
                        </StyledTableCell>

                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      //sacar el rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow key={row.name}>
                            {headerCells.map((i) => (
                              <>
                                <StyledTableCell align="left">
                                  {row[i.key]}
                                </StyledTableCell>
                              </>
                            ))}
                          </TableRow>
                        );
                      })}

                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    </>
  );
}