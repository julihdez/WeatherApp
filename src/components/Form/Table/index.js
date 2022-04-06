import React, { useState, useMemo} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconContext } from 'react-icons';
import IconState from '../../Icons/Icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { store, actions, currentState } from '../../../WeatherContext';




const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    boxShadow: "none"
  },
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
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const iconContextSize = useMemo(() => ({ size:'6em'}), [])
  const isLoading = currentState.isLoading.isLoading


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
                    <TableRow >
                      {!isLoading &&
                      headerCells.map((cell) => (
                        <StyledTableCell style={{ align: "center" }}>
                          <div className="table-head-cell-caret-icon" style={{ lineHeight: "1.05" }}>
                            <p >{cell.title}</p>
                          </div>
                        </StyledTableCell>

                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow key={row.name}>
                            {headerCells.map((i) => (
                              <>
                              {
                                i.isIcon &&
                                <StyledTableCell align="center">
                                  <IconContext.Provider value={iconContextSize}>
                                      {
                                           !isLoading  ? 
                                          <IconState state= {row[i.key]}/>
                                          :
                                           <Skeleton variant="circle" height={80} width={80}></Skeleton>
                                      }
                                  </IconContext.Provider>
                                </StyledTableCell> ||
                                <StyledTableCell align="left">
                                  {row[i.key]}
                                </StyledTableCell>
                              }
                                
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