import { configure } from 'enzyme';
import 'reflect-metadata';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
