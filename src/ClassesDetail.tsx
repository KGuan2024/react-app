import { useParams } from "react-router-dom";

function ClassesDetail() {
  const { classId } = useParams();
  return (
    <div>
      <div>classes Detail AAAA</div>
      <div> {classId}</div>
    </div>
  );
}

export default ClassesDetail;
