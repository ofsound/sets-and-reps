import Exercise from "../components/Exercise.tsx";

function Exercises() {
  const exercises = [
    {
      name: "Lateral Raises",
      attempts: [
        [
          { reps: 3, weight: "35lbs", note: "no belt", date: "stamped" },
          { reps: 4, weight: "25lbs", note: "no belt", date: "stamped" },
        ],
        [
          { reps: 2, weight: "15lbs", note: "no belt", date: "stamped" },
          { reps: 2, weight: "15lbs", note: "no belt", date: "stamped" },
        ],
      ],
    },
    {
      name: "Pec Fly",
      attempts: [
        [
          { reps: 3, weight: "35lbs", note: "no belt", date: "stamped" },
          { reps: 4, weight: "25lbs", note: "no belt", date: "stamped" },
        ],
        [
          { reps: 3, weight: "35lbs", note: "no belt", date: "stamped" },
          { reps: 4, weight: "25lbs", note: "no belt", date: "stamped" },
        ],
      ],
    },
  ];

  return (
    <div>
      {exercises.map((item, index) => (
        <Exercise data={item} key={index} />
      ))}
    </div>
  );
}

export default Exercises;
