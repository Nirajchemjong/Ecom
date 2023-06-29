import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

export const CatTable = () => {
  const { catList } = useSelector((state) => state.categories);
  return (
    <div>
      Categories Table
      <Table
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>#</th>
            <th>status</th>
            <th>Name</th>
            <th>Slug</th>
          </tr>
        </thead>
        <tbody>
          {catList.map((item, i) => (
            <tr key={item.slug}>
              <td>{i + 1}</td>
              <td>
                <span className={item.status}>{item.status}</span>
              </td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>
                <Button variant='warning'>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
