import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ClassDetail,
  getClassDetails,
} from "./mock-data-services/classes.mock";
import styles from "./ClassesDetail.module.css";
import { useQuery } from "./hooks/useQuery.hook";

function ClassesDetail() {
  // const [error, setError] = useState<boolean>(false);
  const { classId } = useParams();
  // const [data, setData] = useState<ClassDetail>();

  const { data, loading, error } = useQuery<ClassDetail>(
    getClassDetails,
    classId
  );

  // do some loading screens if you simulate a timeout
  // useEffect(() => {
  //   if (!classId) {
  //     return;
  //   }

  //   // turn this into reuseable hook for error, loading , data etc ?
  //   getClassDetails(classId)
  //     .then((classData) => {
  //       setData(classData);
  //     })
  //     .catch((error) => setError(true));
  // }, [classId]);

  function listProficiencies(data: ClassDetail) {
    return (
      <section className={styles.list}>
        {data.proficiencies.map((proficiency) => (
          <div key={proficiency.name} className={styles.inlineList}>
            <span className={`${styles.bold} ${styles.proficiencyName}`}>
              {proficiency.name}:
            </span>
            <span>{proficiency.values.join(", ")}</span>
          </div>
        ))}
      </section>
    );
  }

  function listSkills(data: ClassDetail) {
    return (
      <section className={styles.list}>
        {data.classSkills.map((skill) => (
          <div key={skill.name}>
            <div className={styles.inlineList}>
              <span className={`${styles.bold} ${styles.skillName}`}>
                {skill.name}
              </span>
              <span className={styles.level}>(Level {skill.level})</span>
            </div>
            <div>{skill.description}</div>
          </div>
        ))}
      </section>
    );
  }

  if (loading) {
    return <div>LOADING</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className={styles.classDetailContainer}>
      <div className={styles.classData}>
        {data && (
          <>
            <header className={styles.header}> {data.name}</header>
            <section className={styles.imageDescriptionContainer}>
              <img src={`/images/${data.image}`}></img>
              <div className={styles.description}>{data.description}</div>
            </section>

            <section>
              <div className={styles.sectionHeader}>Proficiencies</div>
              {listProficiencies(data)}
            </section>

            <section>
              <div className={styles.sectionHeader}>Skills</div>
              {listSkills(data)}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default ClassesDetail;
