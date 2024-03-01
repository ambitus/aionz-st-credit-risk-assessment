
import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,

  Pagination
} from "@carbon/react";

import classes from "./CraIncident.module.scss";

export default function CalculationResultsPage() {
  const [rows, setRows] = useState([]);

  const allRows = [
    {
      id: '601',
      incident_id: '601',
      time: '2022-11-01 20:30:22',
      person_salary: 21000,
      loan_amount: 64750,
      loan_intent: "EDUCATION",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '611',
      incident_id: '611',
      time: '2022-11-01 20:30:22',
      person_salary: 52000,
      loan_amount: 9600,
      loan_intent: "PERSONAL",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '615',
      incident_id: '615',
      time: '2022-11-01 20:30:22',
      person_salary: 12000,
      loan_amount: 47500,
      loan_intent: "MEDICAL",
      credit_risk_status: "HIGH RISK"
    },
    {
      id: '621',
      incident_id: '621',
      time: '2022-11-01 20:30:22',
      person_salary: 22000,
      loan_amount: 21345,
      loan_intent: "HOME IMPROVEMENT",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '671',
      incident_id: '671',
      time: '2022-11-01 20:30:22',
      person_salary: 34000,
      loan_amount: 45000,
      loan_intent: "DEBT CONSOLIDATION",
      credit_risk_status: "HIGH RISK"
    },
    {
      id: '619',
      incident_id: '619',
      time: '2022-11-01 20:30:22',
      person_salary: 22590,
      loan_amount: 33750,
      loan_intent: "EDUCATION",
      credit_risk_status: "HIGH RISK"
    },
    {
      id: '651',
      incident_id: '651',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 21356,
      loan_intent: "VENTURE",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '617',
      incident_id: '617',
      time: '2022-11-01 20:30:22',
      person_salary: 45000,
      loan_amount: 98760,
      loan_intent: "HOME IMPROVEMENT",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '678',
      incident_id: '678',
      time: '2022-11-01 20:30:22',
      person_salary: 98675,
      loan_amount: 87650,
      loan_intent: "MEDICAL",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '692',
      incident_id: '692',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 345670,
      loan_intent: "DEBT CONSOLIDATION",
      credit_risk_status: "HIGH RISK"
    },
    {
      id: '601',
      incident_id: '601',
      time: '2022-11-01 20:30:22',
      person_salary: 78960,
      loan_amount: 23490,
      loan_intent: "MEDICAL",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '611',
      incident_id: '611',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "VENTURE",
      credit_risk_status: "HIGH RISK"
    },
    {
      id: '615',
      incident_id: '615',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "HOME IMPROVEMENT",
      credit_risk_status: "APPROVED"
    },
    {
      id: '621',
      incident_id: '621',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "MEDICAL",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '671',
      incident_id: '671',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "EDUCATION",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '619',
      incident_id: '619',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "MEDICAL",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '651',
      incident_id: '651',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "DEBT CONSOLIDATION",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '617',
      incident_id: '617',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "VENTURE",
      credit_risk_status: "HIGH RISK"
    },
    {
      id: '678',
      incident_id: '678',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "EDUCATION",
      credit_risk_status: "LOW RISK"
    },
    {
      id: '692',
      incident_id: '692',
      time: '2022-11-01 20:30:22',
      person_salary: 42000,
      loan_amount: 6475,
      loan_intent: "MEDICAL",
      credit_risk_status: "HIGH RISK"
    },

  ];
  const paginate = ({ page, pageSize }) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return allRows.slice(start, end);
  };

  useEffect(() => {
    setRows(paginate({ page: 1, pageSize: 10 }));
  }, []);

  const headers = ['Id', 'Time', 'Salary', 'Loan Amount', 'Loan Intent', 'Credit Risk Status'];
  return (<div>
    <Table size="lg" useZebraStyles={false}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (

            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {Object.keys(row)
              .filter((key) => key !== 'id')
              .map((key) => {
                return <TableCell key={key}>
                  <span className={key === 'credit_risk_status' ? (row[key] === 'LOW RISK' ? classes.riskStatusGreen : classes.riskStatusRed) : classes.KP}>{row[key]}</span></TableCell>;
              })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Pagination
      backwardText="Previous page"
      forwardText="Next page"
      itemsPerPageText="Items per page:"
      onChange={({ page, pageSize }) => {
        setRows(paginate({ page, pageSize }));
      }}
      page={1}
      pageSize={1}
      pageSizes={[10]}
      size="md"
      totalItems={allRows.length} />
  </div>
  );
}

