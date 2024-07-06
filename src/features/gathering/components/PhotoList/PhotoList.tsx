import classnames from 'classnames/bind';
import styles from './photoList.module.scss';
import PhotoCard from './PhotoCard/PhotoCard';

const cn = classnames.bind(styles);

const PhotoList = () => {
  const renderItem = () => {
    return (
      <li className={cn('item')}>
        <PhotoCard />
      </li>
    );
  };
  return (
    <ul className={cn('photo_list')}>
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
      {renderItem()}
    </ul>
  );
};

export default PhotoList;
