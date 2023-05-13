import "./item.css";

export const Item = (props) => {
  return (
    <div className="block">
      <div className="block_row">
        <div className="block_column">
          <div className="block_item">
            <p>
              <b>{props.name}:</b>
              {" " + props.price + " "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
