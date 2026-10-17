import { Institution } from '../types/college';

export const INSTITUTIONS: Institution[] = [
  {
    id: 'ait-pune',
    name: 'Army Institute of Technology (AIT), Pune',
    shortName: 'AIT Pune',
    campusLocation: 'Dighi Hills, Alandi Road, Pune, Maharashtra 411015',
    established: 1994,
    departments: [
      {
        id: 'dept-entc',
        institutionId: 'ait-pune',
        name: 'Electronics & Telecommunication Engineering',
        code: 'E&TC',
        laboratories: [
          {
            id: 'lab-entc-del',
            departmentId: 'dept-entc',
            name: 'Digital Electronics & Logic Design Lab',
            shortCode: 'DEL-LAB',
            roomNumber: 'Room 204, Academic Block A',
            labInCharge: 'Dr. P. B. Karandikar (Assoc. Prof)',
            labAssistant: 'Mr. S. K. Pawar',
            equipmentCount: 6,
            activeCourses: ['Digital Circuits (ET203)', 'Integrated Circuits & Applications (ET301)'],
            description: 'Dedicated laboratory for Boolean logic synthesis, digital IC characterization, sequential circuits, and microcontroller interfacing.'
          },
          {
            id: 'lab-entc-analog',
            departmentId: 'dept-entc',
            name: 'Analog Circuits & Signal Processing Lab',
            shortCode: 'AC-LAB',
            roomNumber: 'Room 208, Academic Block A',
            labInCharge: 'Dr. S. R. Sharma (Assoc. Prof)',
            labAssistant: 'Mrs. M. V. Kulkarni',
            equipmentCount: 4,
            activeCourses: ['Electronic Devices & Circuits (ET201)', 'Signals & Systems (ET205)'],
            description: 'Equipped with precision function generators, digital storage oscilloscopes, analog trainers, and active filter test stations.'
          },
          {
            id: 'lab-entc-iot',
            departmentId: 'dept-entc',
            name: 'Microcontrollers, Embedded Systems & IoT Lab',
            shortCode: 'IOT-LAB',
            roomNumber: 'Room 305, Tech Block',
            labInCharge: 'Prof. R. S. Gaikwad',
            labAssistant: 'Mr. A. D. Shinde',
            equipmentCount: 5,
            activeCourses: ['Embedded Systems & RTOS (ET402)', 'IoT Architectures (ET406)'],
            description: 'Development setups for ARM Cortex-M, ESP32, STM32, and sensor nodes for automated telemetry and edge computing.'
          }
        ]
      },
      {
        id: 'dept-mech',
        institutionId: 'ait-pune',
        name: 'Mechanical Engineering',
        code: 'MECH',
        laboratories: [
          {
            id: 'lab-mech-inst',
            departmentId: 'dept-mech',
            name: 'Sensors, Transducers & Mechatronics Lab',
            shortCode: 'MECH-TRON',
            roomNumber: 'Room 112, Workshop Wing',
            labInCharge: 'Dr. J. D. Patil',
            labAssistant: 'Mr. V. B. Jadhav',
            equipmentCount: 3,
            activeCourses: ['Mechatronics & Instrumentation (ME304)'],
            description: 'Experimental benches for displacement, strain gauges, LVDTs, thermocouple calibration, and pneumatic actuators.'
          }
        ]
      },
      {
        id: 'dept-comp',
        institutionId: 'ait-pune',
        name: 'Computer Engineering',
        code: 'COMP',
        laboratories: [
          {
            id: 'lab-comp-hw',
            departmentId: 'dept-comp',
            name: 'Computer Hardware & Microprocessor Lab',
            shortCode: 'CHW-LAB',
            roomNumber: 'Room 402, IT Tower',
            labInCharge: 'Dr. A. S. Deshmukh',
            labAssistant: 'Mr. N. R. Kadam',
            equipmentCount: 4,
            activeCourses: ['Computer Architecture (CS202)', 'Microprocessor Interfacing (CS204)'],
            description: 'Hardware architectures, logic analyzers, bus architectures, and FPGA synthesis benches.'
          }
        ]
      }
    ]
  }
];

export const DEFAULT_INSTITUTION = INSTITUTIONS[0];
export const DEFAULT_DEPARTMENT = INSTITUTIONS[0].departments[0];
export const DEFAULT_LAB = INSTITUTIONS[0].departments[0].laboratories[0];
