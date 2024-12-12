import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ClassDetail,
  getClassDetails,
} from "./mock-data-services/classes.mock";
import styles from "./ClassesDetail.module.css";

function ClassesDetail() {
  const [error, setError] = useState<boolean>(false);
  const { classId } = useParams();
  const [data, setData] = useState<ClassDetail>();

  // do some loading screens if you simulate a timeout
  useEffect(() => {
    if (!classId) {
      return;
    }

    const classData = getClassDetails(classId);
    setData(classData);
    if (!classData) {
      setError(true);
    } else {
      setError(false);
    }
    // do some error screen if classdata is undefined
  }, [classId]);

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

  if (!data) {
    if (!error) {
      return <div>LOADING</div>;
    } else {
      return <div>Error</div>;
    }
  } else {
    return (
      <div className={styles.classDetailContainer}>
        <div className={styles.classData}>
          <div className={styles.header}> {data.name}</div>
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
        </div>
      </div>
    );
  }
}

export default ClassesDetail;
