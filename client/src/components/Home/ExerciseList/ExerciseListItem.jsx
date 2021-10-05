import "./ExerciseListItem.scss";
import { CgGym } from "react-icons/cg";
import { BiBody } from "react-icons/bi";
import { GiArcheryTarget } from "react-icons/gi";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default function ExerciseListItem(props) {
  const { id, name, equipment, gifUrl, bodyPart, target, onAdd } = props;
  const exercise = { id, name, equipment, gifUrl, bodyPart, target };

  function capitalizeWords(string) {
    const words = string.split(" ");
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    const final = words.join(" ");
    return final;
  }

  return (
    <div className="exerciseItem">
      <div class="leftBox">
        <img variant="top" src={gifUrl} />
        <h5>{capitalizeWords(name)}</h5>
      </div>
      <div className="rightBox">
        <div class="listAttribute">
          <div>
            <CgGym size={30} />
          </div>
          <p>{capitalizeWords(equipment)}</p>
        </div>
        <div class="listAttribute">
          <div>
            {" "}
            <BiBody size={30} />
          </div>
          <p>{capitalizeWords(bodyPart)}</p>
        </div>
        <div class="listAttribute">
          <div>
            <GiArcheryTarget size={30} />
          </div>
          <p>{capitalizeWords(target)}</p>
        </div>
        {/* <div class="listAttribute"></div>
        <CgGym />
        <p>Body Part: {capitalizeWords(bodyPart)}</p>
        </div>
        <div class="listAttribute"></div>
        <CgGym />
        <p>Target: {capitalizeWords(target)}</p>
        </div> */}
        <button onClick={() => onAdd(exercise)}>+</button>
      </div>
    </div>
  );
}
