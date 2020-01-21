import { GET_WORK_DATA, GET_WORK_SKILLS, GET_WORK_BOOKS } from 'actions/types';
import { List } from 'immutable';
import reducer from './profileReducer';

describe('profile reducer', () => {
  const mockWorkData = List([
    {
      date: 2019,
      title: 'Title',
      label: 'Label',
      location: 'Location',
      content: 'Content',
    },
  ]);
  const mockWorkSkills = List([
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'Git' },
    { name: 'HTML5' },
  ]);

  const mockWorkBooks = List([
    {
      name: 'Refactoring: Improving the Design of Existing Code',
      author: 'Martin Fowler',
      link: 'https://martinfowler.com/books/refactoring.html',
    },
    {
      name: 'Working Effectively with Legacy Code',
      author: 'Michael Feathers',
      link: 'https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052',
    },
  ]);

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('should handle GET_WORK_DATA', () => {
    const successAction = {
      type: GET_WORK_DATA,
      payload: mockWorkData,
    };
    expect(reducer({}, successAction)).toEqual({
      workData: List(mockWorkData),
    });
  });
  it('should handle GET_WORK_SKILLS', () => {
    const successAction = {
      type: GET_WORK_SKILLS,
      payload: mockWorkSkills,
    };
    expect(reducer({}, successAction)).toEqual({
      workSkills: List(mockWorkSkills),
    });
  });
  it('should handle GET_WORK_BOOKS', () => {
    const successAction = {
      type: GET_WORK_BOOKS,
      payload: mockWorkBooks,
    };
    expect(reducer({}, successAction)).toEqual({
      workBooks: List(mockWorkBooks),
    });
  });
});
