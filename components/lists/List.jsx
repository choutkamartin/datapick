function List({ children }) {
  return <ul className="list-disc list-inside">{children}</ul>;
}

function Item({ children }) {
  return <li>{children}</li>;
}

List.Item = Item;
export default List;
