import React from 'react';
import PropTypes from 'prop-types';
// Components
import WorkItem from 'components/WorkItem/WorkItem';
// Styles
import styles from './Timeline.scss';

const Timeline = (props) => {
  const { title, icon, data } = props;
  return (
    <div className={styles.timeline}>
      <div className={styles.title}>
        {icon && <div className={styles.icon}>
          <i className={`fa fa-${icon}`} />
        </div>
        }
        <span>{title}</span>
      </div>
      {
        data.map((item) => (
          <div key={item.year} className={styles.event}>
            <div className={styles.year}>{item.year}</div>
            <div className={styles.content}>
              {item.type === 'work' && <WorkItem data={item.content}/>}
              {item.type === 'text' && item.content}
            </div>
          </div>
        ))
      }
    </div>
  );
};

Timeline.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  data: PropTypes.any,
};

export default Timeline;
