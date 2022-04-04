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
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow]=useState({});

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event,row) => {
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
                  {/* cell.isNumber ? "table-head-cell-caret-icon-flex-end" :  */}
                  <TableHead>
                    <TableRow>
                    {headerCells.map((cell) => (
                          <StyledTableCell align="right" >
                            <div className={cell.isNumber ? "table-head-cell-caret-icon-flex-end" : "table-head-cell-caret-icon"}style={{textAlign: "center", lineHeight: "1.05"}}>
                              <p>{cell.title}</p>
                              {cell.hasCaret && (
                                <FaCaretDown onClick={cell.onClickSorting} />
                              )}
                            </div>
                          </StyledTableCell>
                       
                      ))}
                      {hasActions && (
                        <TableCell
                          className={classes.sticky}
                          align="right"
                        ></TableCell>
                      )}
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
                              {i.isNumber && 
                                <StyledTableCell align="right">
                                {row[i.key]}
                                </StyledTableCell> ||
                                <StyledTableCell align="left">
                                  {row[i.key]}
                                </StyledTableCell>
                              }
                              </>
                            ))}
                            <>
                            
                              </>
                            {hasActions && (
                              <StyledTableCell className={classes.sticky} align="right">
                                <FaEllipsisV 
                                onClick={(e)=>handleClick(e,row)} 
                                />
                              </StyledTableCell>
                            )}
                          </TableRow>
                        );
                      })}
                      {/* {emptyRows > 0 && 
                      <TableRow style={{ height: 5 * emptyRows }}>
                        <StyledTableCell colSpan={6} />
                      </TableRow>} */}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                  component="div"
                  count = {rows.length}
                  rowsPerPage={rowsPerPage}
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                  rowsPerPageOptions={[]}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Popover
              elevation={1}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
            {hasActions &&
              <div className="table-popover-container">
                {actions.map((action) => (
                  <div className="table-popover-option" onClick={()=>action.action(selectedRow)}>
                    {action.name}
                  </div>
                ))}
              </div>
            }
            </Popover>
          </div>
        </MuiThemeProvider>
      </div>
    </>
  );
}
