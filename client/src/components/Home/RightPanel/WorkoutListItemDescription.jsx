import "./WorkoutListItemDescription.scss";

export default function WorkoutListItemDescription(props) {
  const { name, set, reps } = props;

  function capitalizeWords(string) {
    const words = string.split(" ");
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    const final = words.join(" ");
    return final;
  }

  return (
    <div className="face face 2">
      <div class="content">
        <h3 className="name">
          {capitalizeWords(name)}
          <p className="set-reps">
            Set: {set} Reps: {reps}
          </p>
        </h3>
      </div>
    </div>
  );
}
