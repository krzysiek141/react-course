import { Fragment } from "react";
import { useState } from "react";
import styles from './ListGroup.module.css';
import styled from 'styled-components';

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup(props: ListGroupProps) {
  
  const { items, heading, onSelectItem} = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Fragment>
      <h1>{heading}</h1>
      {items.length === 0 ? <p>No items</p> : null}
      <ul className={styles.listGroup}>
        {items.map((item, index) => (
          <li
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            key={item}
            onClick={
              () => {
                setSelectedIndex(index)
                onSelectItem(item)
              }
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;




// jak daję export default to potem mogę to importować ale muszę chyba samą nazwą a nie tą w klamrach