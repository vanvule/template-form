import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns } from "./dataGrid.column";
import { getPolicies } from '../../store/indexedDB';

import { useInsuranceContext } from "../Insurance/InsuranceContext";

import "./DataTable.scss";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface rowData {
  no: number;
  fullName: string;
  id: string;
  age: number;
  gender: string;
  relationship: string;
  insurePackage: string;
  startDate: string;
  endDate: string;
  fee: number;
  dob: string;
}

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const DataGrid = () => {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [rows, setRows] = React.useState<rowData[]>([]);

  const { setMode, setSelectedRow } = useInsuranceContext();
  const { selectedRow, searchText } = useInsuranceContext();


  React.useEffect(() => {
    const fetchData = async () => {
      const policies = await getPolicies();
      const formattedPolicies = policies.map((policy, index) => ({
        ...policy,
        no: index + 1,
        age: calculateAge(policy.dob),
      }));
      setRows(formattedPolicies);
    };
    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row: rowData) => {
    setSelectedRow(row);
    setMode('edit');
  };

  const emptyDataRender = () => {
    return (
      <Box
        sx={{
          bgcolor: 'transparent',
          padding: '2rem',
        }}
      >
        <Box
          sx={{
            bgcolor: '#edf7ed',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}
        >
          <Stack
            direction="column"
            justifyContent='start'
          >
            <Box
              component="p"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: "#1d4620",
                margin: '0 1rem'
              }}
              children="No data found"
            />
            <Box
              component="p"
              sx={{
                fontSize: '1rem',
                fontWeight: 'normal',
                color: "#1d4620",
                margin: '1rem'
              }}
              children={
                <div>
                  Please add new data by clicking on the Add button
                </div>
              }
            />
          </Stack>
        </Box>
      </Box>
    );
  }

  const filteredRows = rows.filter(row => {
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    filteredRows.length === 0 ? emptyDataRender() : 
    (
    <Paper
      sx={{
        width: "97%",
        overflow: "hidden",
        margin: "2rem 0 2rem 2rem",
      }}
    >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id || index}
                        onClick={() => handleRowClick(row)}
                        selected={selectedRow === row}
                        className="table-row"
                      >
                        {columns.map((column) => {
                          // @ts-ignore
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </Paper>
  ));
};
