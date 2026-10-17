import { Equipment } from '../types/equipment';
import { EQUIPMENT_IMAGES } from './sampleImages';

export const INITIAL_EQUIPMENT_DATABASE: Equipment[] = [
  {
    id: 'eq-dso-tek',
    assetCode: 'AIT-ENTC-DEL-042',
    name: 'Tektronix TBS1052B-EDU Digital Storage Oscilloscope',
    shortName: 'DSO Tektronix 50MHz',
    aliases: ['DSO', 'Oscilloscope', 'Tektronix Scope', 'Digital Scope', 'CRO digital replacement'],
    category: 'instrument',
    model: 'TBS1052B-EDU (50 MHz, 2-Channel, 1 GS/s)',
    manufacturer: 'Tektronix Inc.',
    institutionId: 'ait-pune',
    departmentId: 'dept-entc',
    labId: 'lab-entc-del',
    benchLocation: 'Bench 4, Rack A (Primary Station)',
    status: 'verified',
    lastReviewedDate: '2026-03-12',
    verifiedBy: 'Dr. P. B. Karandikar',
    reviewerDesignation: 'Associate Professor & Lab In-Charge, E&TC',
    imageUrl: EQUIPMENT_IMAGES.dso,
    thumbnailUrl: EQUIPMENT_IMAGES.dso,
    overview: 'A 2-channel digital storage oscilloscope used to capture, visualize, and analyze time-varying electrical voltages with 1 GS/s real-time sampling and automated parameter calculations.',
    whatIsIt: 'A Digital Storage Oscilloscope (DSO) is an electronic test instrument that graphically displays varying signal voltages as a two-dimensional plot over time. Unlike analog cathode ray oscilloscopes, a DSO digitizes input waveforms using high-speed Flash ADCs, stores the discrete sample points in digital acquisition memory, and performs automated mathematical calculations like FFT spectrum analysis, peak-to-peak voltage, rise time, and frequency estimation.',
    purposeAndApplications: [
      'Visualizing real-time transient and repetitive voltage waveforms up to 50 MHz.',
      'Measuring circuit parameters: Peak-to-Peak (Vpp), RMS voltage, period, frequency, and duty cycle.',
      'Analyzing phase shifts between two alternating signals via Dual-Channel display or X-Y Lissajous figures.',
      'Debugging microcontrollers and digital buses (UART, SPI clock verification, ripple noise on power rails).',
      'Fast Fourier Transform (FFT) analysis to measure frequency harmonics and signal distortion.'
    ],
    howItWorks: 'The input voltage arrives through high-impedance (1 MΩ || 20 pF) BNC connectors. A precision programmable attenuator conditions the signal into the dynamic range of an internal ultra-fast Flash Analog-to-Digital Converter (ADC). The ADC samples the continuous analog signal at up to 1 Gigasample per second, storing numerical voltage representations in high-speed circular SRAM. When the signal meets the configured trigger condition (such as a rising edge exceeding a threshold voltage), acquisition freezes or transfers the buffer to the digital signal processor, which maps the points across the LCD graticule grid.',
    whereItIsUsed: [
      'Digital Electronics & Logic Design Lab (Pulse timing, flip-flop propagation delays)',
      'Analog Communication Lab (Modulation depth, envelope detectors, frequency carriers)',
      'Embedded Systems Bench (Crystal oscillator frequency verification, PWM duty cycle checks)',
      'Audio & Power Electronics (Inverter output harmonics, ripple factor measurements)'
    ],
    operatingProcedure: [
      {
        step: 1,
        title: 'Initial Power-up & Self Test',
        instruction: 'Ensure the rear rocker switch is switched ON, then press the soft power button on the top right. Allow 15 seconds for boot diagnostics. Verify the green ready indicator lights up.',
        tip: 'Check that the cooling fan vents on the back and sides are unobstructed.'
      },
      {
        step: 2,
        title: 'Probe Calibration & 10X Compensation',
        instruction: 'Connect the BNC probe to CH 1. Connect the probe hook tip to the PROBE COMP terminal (5V, 1 kHz) and the alligator ground clip to the adjacent ground loop. Press the AUTOSET button.',
        warning: 'Ensure the physical slide switch on the probe barrel matches the channel menu attenuation (10X mode is standard to prevent circuit loading).',
        tip: 'If the square wave corners are rounded (under-compensated) or spiked (over-compensated), gently adjust the probe trimmer screw with the insulated plastic screwdriver.'
      },
      {
        step: 3,
        title: 'Signal Connection to Device Under Test (DUT)',
        instruction: 'Connect the probe ground alligator clip ONLY to the 0V reference (circuit ground) of your breadboard. Clip the probe tip onto the measurement node.',
        warning: 'CRITICAL SAFETY: The BNC ground shield is internally connected directly to Mains Earth Ground. NEVER clip the ground alligator lead to non-zero, floating, or live AC potentials, or you will cause a dead short circuit and blow the circuit breaker!'
      },
      {
        step: 4,
        title: 'Scale & Trigger Adjustment',
        instruction: 'Adjust the VOLTS/DIV knob until the waveform occupies 4 to 6 vertical divisions. Rotate the SEC/DIV knob until 2 to 3 complete waveform cycles appear. Adjust the TRIGGER LEVEL knob until the trigger marker matches the waveform edge and the top status reads TRIG\'D (Green).',
        tip: 'If the trace rolls or flickers erratically, press the TRIGGER MENU button and ensure the Source is set to the active channel (e.g. CH 1).'
      },
      {
        step: 5,
        title: 'Automated Measurement Readout',
        instruction: 'Press the MEASURE button in the top menu. Select Type -> Frequency, Vpp, and Mean. Read verified digital measurements directly on the right screen sidebar.',
        tip: 'You can insert a FAT32 USB flash drive into the front port and press SAVE/PRINT to capture waveform CSV data or a PNG screenshot for your lab report.'
      }
    ],
    pinoutAndConnections: {
      diagramType: 'front_panel',
      packageType: 'BNC Standard Panel & Terminals',
      pins: [
        {
          number: 'CH 1',
          name: 'Channel 1 Input (BNC)',
          type: 'analog',
          voltageLevel: 'Max 300V CAT II (1MΩ || 20pF)',
          description: 'Primary input for channel 1 analog signal. Uses standard 1X/10X passive probe.',
          hotspotCoordinates: { x: 65, y: 80 }
        },
        {
          number: 'CH 2',
          name: 'Channel 2 Input (BNC)',
          type: 'analog',
          voltageLevel: 'Max 300V CAT II (1MΩ || 20pF)',
          description: 'Secondary input channel for dual-trace comparative analysis or X-Y phase plot input.',
          hotspotCoordinates: { x: 75, y: 80 }
        },
        {
          number: 'EXT TRIG',
          name: 'External Trigger Input (BNC)',
          type: 'input',
          voltageLevel: 'Max 300V CAT II',
          description: 'Allows synchronizing oscilloscope sweeps with an external clock without consuming CH 1 or CH 2 display channels.',
          hotspotCoordinates: { x: 85, y: 80 }
        },
        {
          number: 'PROBE COMP',
          name: 'Probe Compensation Loop',
          type: 'output',
          voltageLevel: '5.0V Peak-to-Peak @ 1.0 kHz',
          description: 'Factory-calibrated 1 kHz square wave reference used to adjust probe capacitance trim.',
          hotspotCoordinates: { x: 92, y: 80 }
        },
        {
          number: 'USB HOST',
          name: 'Front USB Port',
          type: 'bidirectional',
          voltageLevel: '5V DC 500mA',
          description: 'FAT32 memory stick connector for exporting raw CSV samples and bitmap screen captures.',
          hotspotCoordinates: { x: 12, y: 82 }
        }
      ],
      wiringRules: [
        'Always ensure probe ground lead is at ground potential (0V).',
        'Use 10X attenuation setting whenever probing high-impedance nodes (>10kΩ) or digital clock frequencies (>5MHz) to minimize capacitive loading.',
        'Never exceed 300V RMS input limit.'
      ]
    },
    technicalSpecs: [
      { property: 'Analog Bandwidth', value: '50', unit: 'MHz (-3 dB)' },
      { property: 'Real-time Sample Rate', value: '1.0', unit: 'GS/s per channel' },
      { property: 'Input Channels', value: '2', unit: 'isolated channels' },
      { property: 'Record Length', value: '2.5k', unit: 'points per channel' },
      { property: 'Vertical Resolution', value: '8', unit: 'bits' },
      { property: 'Input Impedance', value: '1 MΩ ±2% || 20 pF ±3 pF', unit: '' },
      { property: 'Vertical Sensitivity', value: '2 mV/div to 5 V/div', unit: '' },
      { property: 'Timebase Range', value: '5 ns/div to 50 s/div', unit: '' },
      { property: 'Maximum Rated Input', value: '300 V', unit: 'RMS CAT II' }
    ],
    safetyPrecautions: [
      {
        severity: 'critical',
        text: 'NEVER connect probe alligator ground to any point other than circuit ground (0V).',
        rationale: 'The BNC shell is bonded to the chassis and protective Earth pin of the power cord. Connecting it to a live potential will cause catastrophic short-circuit currents through the probe shield wire.'
      },
      {
        severity: 'warning',
        text: 'Do not probe voltages exceeding 300V RMS or 400V peak.',
        rationale: 'Exceeding the CAT II maximum rating damages the internal preamplifier JFETs and pose electrical shock risks.'
      },
      {
        severity: 'info',
        text: 'Avoid placing magnetic stirrers or high-current inductors directly beside the scope chassis.',
        rationale: 'Strong external magnetic fields induce 50 Hz hum into the high-impedance preamplifiers.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Displaying 1/10th or 10X the real voltage amplitude on screen.',
        consequence: 'Readouts will be completely erroneous in the laboratory notebook.',
        fix: 'Ensure the hardware switch on the probe body (1X or 10X) matches the software setting in the Channel Menu (press CH1 button -> Probe -> 10X).'
      },
      {
        mistake: 'Waveform continuously scrolling horizontally across the display.',
        consequence: 'Cannot take stable time or frequency measurements.',
        fix: 'The trigger level is set above or below the signal range. Press TRIGGER MENU, ensure Trigger Source is CH1, and press "Set to 50%" or turn the Trigger Level knob until the cursor intersects the waveform.'
      },
      {
        mistake: 'DC offset not visible when measuring biased signals (e.g., transistor base).',
        consequence: 'Only the AC ripple is shown, leading the student to miss saturation conditions.',
        fix: 'Change channel coupling from AC to DC in the Channel 1 Menu.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'No trace visible on display despite power LED being ON.',
        probableCause: 'Horizontal or vertical position knobs shifted the waveform completely off the graticule window.',
        remedy: 'Press the AUTOSET button, or press the vertical and horizontal position knobs to center the trace.'
      },
      {
        symptom: 'Signal is noisy with heavy 50Hz/60Hz mains hum.',
        probableCause: 'Loose alligator ground clip or excessive loop area acting as an antenna.',
        remedy: 'Secure the ground lead as close as physically possible to the DUT signal node, or engage the 20 MHz Bandwidth Limit filter in the channel menu.'
      },
      {
        symptom: 'Screen shows "Uncal" or square wave edges are curved.',
        probableCause: 'Probe internal compensation capacitor is out of calibration.',
        remedy: 'Clip probe to PROBE COMP terminal and adjust the trimmer capacitor using a ceramic alignment tool until edges are crisp and square.'
      }
    ],
    relatedComponents: [
      {
        id: 'eq-fg-keysight',
        name: 'Keysight 33220A Function Generator',
        relationType: 'pairs_with',
        note: 'Used as standard signal excitation source for frequency response testing on the DSO.'
      },
      {
        id: 'eq-dmm-fluke',
        name: 'Fluke 115 Digital Multimeter',
        relationType: 'pairs_with',
        note: 'Used to cross-verify DSO true-RMS calculations with a calibrated bench DMM.'
      }
    ],
    labManualReference: {
      manualTitle: 'AIT E&TC Laboratory Manual: Integrated Circuits & Applications (ET301)',
      experimentNumber: 'Exp 02',
      experimentName: 'Study and Calibration of Digital Storage Oscilloscope (DSO) & Waveform Parameter Analysis',
      courseCode: 'ET301',
      pageReference: 'Pages 14-22',
      syllabusTopic: 'Unit II: Time-domain Measurements and Precision Instrument Calibration'
    },
    hotspots: [
      {
        id: 'hs-ch1',
        title: 'Channel 1 BNC Input',
        x: 65,
        y: 80,
        description: 'Main 50MHz input connector with 1MΩ input impedance and 300V CAT II rating.',
        categoryTag: 'terminal'
      },
      {
        id: 'hs-vscale',
        title: 'Volts/Div Rotary Encoder',
        x: 81,
        y: 30,
        description: 'Rotates to scale vertical amplifier gain from 2mV/div to 5V/div.',
        categoryTag: 'control'
      },
      {
        id: 'hs-autoset',
        title: 'AUTOSET Quick Calibration',
        x: 69,
        y: 44,
        description: 'Automatically analyzes input signals and configures optimal vertical, horizontal, and trigger settings within 3 seconds.',
        categoryTag: 'control'
      },
      {
        id: 'hs-screen',
        title: 'Active Color LCD Graticule',
        x: 35,
        y: 50,
        description: 'High-contrast 8x10 division display showing active signals, cursor readouts, and frequency counter.',
        categoryTag: 'display'
      }
    ]
  },

  {
    id: 'eq-fg-keysight',
    assetCode: 'AIT-ENTC-DEL-018',
    name: 'Keysight 33220A 20MHz Function & Arbitrary Waveform Generator',
    shortName: 'Keysight 33220A Function Gen',
    aliases: ['Function Generator', 'Signal Generator', 'Arbitrary Waveform Gen', 'FG', 'Waveform Generator'],
    category: 'instrument',
    model: '33220A (20 MHz, Direct Digital Synthesis DDS)',
    manufacturer: 'Keysight Technologies / Agilent',
    institutionId: 'ait-pune',
    departmentId: 'dept-entc',
    labId: 'lab-entc-del',
    benchLocation: 'Bench 4, Rack B',
    status: 'verified',
    lastReviewedDate: '2026-03-10',
    verifiedBy: 'Dr. P. B. Karandikar',
    reviewerDesignation: 'Associate Professor & Lab In-Charge, E&TC',
    imageUrl: EQUIPMENT_IMAGES.functionGenerator,
    thumbnailUrl: EQUIPMENT_IMAGES.functionGenerator,
    overview: 'High-precision 20 MHz Direct Digital Synthesis (DDS) waveform generator capable of producing sine, square, ramp, triangle, pulse, noise, and arbitrary analog voltage signals.',
    whatIsIt: 'The Keysight 33220A is a versatile signal source utilizing Direct Digital Synthesis (DDS) architecture. DDS employs a phase accumulator, a lookup table in ROM containing sampled waveform coefficients, and a high-speed DAC to generate extremely low-distortion, mathematically precise waveforms with 1 µHz frequency resolution and ±1 ppm stability.',
    purposeAndApplications: [
      'Providing standardized excitation signals (sine, square, triangle) for circuit characterization.',
      'Testing bandwidth, cutoff frequency, and roll-off rate of active RC filters.',
      'Generating PWM clock pulses for microcontroller interrupt validation.',
      'Supplying carrier and modulating signals for AM and FM modulation experiments.',
      'Simulating transducer outputs with custom arbitrary waveforms.'
    ],
    howItWorks: 'A precise internal 50 MHz quartz oscillator clocks a 32-bit phase accumulator. For each clock tick, a digital phase increment proportional to the desired frequency is summed. The phase address accesses a DAC lookup table that maps digital values to an analog voltage. The analog signal passes through a 7th-order elliptic reconstruction low-pass filter to remove sampling artifacts, followed by an adjustable output attenuator.',
    whereItIsUsed: [
      'Analog Circuits Lab (BJT frequency response, operational amplifier slew rate testing)',
      'Digital Lab (Clock pulse generation for counters and shift registers)',
      'Communication Systems Lab (Carrier generation, frequency division multiplexing)'
    ],
    operatingProcedure: [
      {
        step: 1,
        title: 'Power-on & Output Impedance Configuration',
        instruction: 'Turn power ON. Press the "Utility" button, enter "Output Setup", and configure Load Impedance to either 50 Ω or High-Z matching your circuit.',
        warning: 'CRITICAL: If you select 50 Ω load setting but connect to a high-impedance oscilloscope probe (1 MΩ), the actual output voltage will be EXACTLY DOUBLE the value displayed on the screen!',
        tip: 'For typical breadboard op-amp circuits, select High-Z load mode.'
      },
      {
        step: 2,
        title: 'Waveform Selection',
        instruction: 'Press the dedicated button for the desired waveform shape: SINE, SQUARE, RAMP, PULSE, or NOISE.',
        tip: 'For Square waves, you can press Duty Cycle to adjust high/low duty ratio between 20% and 80%.'
      },
      {
        step: 3,
        title: 'Frequency & Amplitude Entry',
        instruction: 'Press the "Freq" softkey and use the rotary encoder or numerical keypad with unit keys (kHz, MHz). Press "Ampl" to enter Vpp (Peak-to-Peak) or Vrms. Press "Offset" to configure any required DC bias.',
        tip: 'Always verify peak-to-peak amplitude does not exceed the power supply rails of your operational amplifier under test.'
      },
      {
        step: 4,
        title: 'Output Activation',
        instruction: 'Press the illuminated "Output" button above the 50Ω BNC connector. The LED turns green, indicating the signal is actively driving the BNC terminal.'
      }
    ],
    pinoutAndConnections: {
      diagramType: 'terminal_panel',
      packageType: 'BNC Coaxial Front Terminals',
      pins: [
        {
          number: 'MAIN OUT',
          name: 'Main Waveform Output (50 Ω)',
          type: 'output',
          voltageLevel: '10 mVpp to 10 Vpp into 50 Ω (20 Vpp into Open Circuit)',
          description: 'Primary BNC output for generated signals. Center pin is positive, outer shell is circuit ground.',
          hotspotCoordinates: { x: 79, y: 77 }
        },
        {
          number: 'SYNC / TRIG',
          name: 'Sync / Trigger Output (TTL)',
          type: 'output',
          voltageLevel: '0V to 3.3V / 5V TTL Logic',
          description: 'Produces a synchronized TTL pulse at each cycle start, ideal for triggering an oscilloscope.',
          hotspotCoordinates: { x: 90, y: 77 }
        },
        {
          number: 'MOD IN',
          name: 'Modulation Input (Rear BNC)',
          type: 'input',
          voltageLevel: '±5 V Max',
          description: 'Rear-panel analog input for external AM, FM, or PM modulating signals.',
          hotspotCoordinates: { x: 95, y: 30 }
        }
      ],
      wiringRules: [
        'Never apply external DC or AC voltage back into the MAIN OUT BNC connector (damages output stage transistors).',
        'Use shielded 50 Ω coaxial BNC cables to prevent RF interference and reflections.'
      ]
    },
    technicalSpecs: [
      { property: 'Frequency Range (Sine)', value: '1 µHz to 20', unit: 'MHz' },
      { property: 'Frequency Range (Square)', value: '1 µHz to 20', unit: 'MHz' },
      { property: 'Frequency Resolution', value: '1', unit: 'µHz' },
      { property: 'Amplitude Accuracy', value: '±1%', unit: 'of setting' },
      { property: 'Output Impedance', value: '50', unit: 'Ω (selectable High-Z)' },
      { property: 'Total Harmonic Distortion (THD)', value: '< 0.04%', unit: 'up to 20 kHz' },
      { property: 'Square Wave Rise/Fall Time', value: '< 13', unit: 'ns' },
      { property: 'Arbitrary Waveform Resolution', value: '14 bits, 50 MS/s', unit: '' }
    ],
    safetyPrecautions: [
      {
        severity: 'critical',
        text: 'Never back-feed power supply voltages (+Vcc / -Vee) into the output BNC port.',
        rationale: 'Back-feeding power burns out the internal 50Ω current-limiting resistors and op-amp buffer.'
      },
      {
        severity: 'warning',
        text: 'Ensure capacitive load does not exceed 1000 pF on high-frequency signals.',
        rationale: 'Excessive capacitance causes phase margin degradation and high-frequency oscillation in the output driver.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Oscilloscope reads double the amplitude set on the function generator (e.g., set 2Vpp, scope shows 4Vpp).',
        consequence: 'Students suspect broken hardware or flawed scope calibration.',
        fix: 'The generator defaults to a 50Ω load termination model. When plugged into a 1MΩ scope, voltage reflection causes 2X voltage. Go to Utility -> Output Setup -> Load -> Change from 50Ω to High-Z.'
      },
      {
        mistake: 'Forgetting to press the illuminated "OUTPUT" enable button.',
        consequence: 'Zero signal arrives at the breadboard.',
        fix: 'Verify the green LED above the output BNC connector is lit.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Output signal is clipped on positive or negative peaks.',
        probableCause: 'DC Offset setting is pushing the waveform beyond the maximum ±10V output amplifier limits.',
        remedy: 'Press "Offset" and reset to 0.00 V, or reduce amplitude so (Vpp/2 + |Voffset|) < 10V.'
      },
      {
        symptom: 'Square wave displays severe ringing and overshoot.',
        probableCause: 'Impedance mismatch and lack of 50Ω termination on high-frequency cable.',
        remedy: 'Use a short BNC cable with an inline 50Ω BNC terminator, or inspect breadboard jumper inductance.'
      }
    ],
    relatedComponents: [
      {
        id: 'eq-dso-tek',
        name: 'Tektronix TBS1052B Oscilloscope',
        relationType: 'pairs_with',
        note: 'Primary visualization tool for analyzing waveform shapes output by this generator.'
      }
    ],
    labManualReference: {
      manualTitle: 'AIT E&TC Laboratory Manual: Signals & Networks (ET205)',
      experimentNumber: 'Exp 01',
      experimentName: 'Generation of Basic Signals and Frequency Response Analysis of First-Order Filters',
      courseCode: 'ET205',
      pageReference: 'Pages 5-12'
    }
  },

  {
    id: 'eq-rps-scientific',
    assetCode: 'AIT-ENTC-DEL-005',
    name: 'Scientific PSD3304 Dual Tracking Regulated DC Power Supply',
    shortName: 'Dual DC Power Supply 30V/3A',
    aliases: ['DC Power Supply', 'RPS', 'Regulated Power Supply', 'Bench Power Supply', 'Dual RPS'],
    category: 'power_supply',
    model: 'Scientific PSD3304 (0-30V / 0-3A x 2 + Fixed 5V/3A)',
    manufacturer: 'Scientific Mes-Technik Pvt. Ltd.',
    institutionId: 'ait-pune',
    departmentId: 'dept-entc',
    labId: 'lab-entc-del',
    benchLocation: 'Bench 4, Center Shelf',
    status: 'verified',
    lastReviewedDate: '2026-03-08',
    verifiedBy: 'Dr. P. B. Karandikar',
    reviewerDesignation: 'Associate Professor & Lab In-Charge, E&TC',
    imageUrl: EQUIPMENT_IMAGES.powerSupply,
    thumbnailUrl: EQUIPMENT_IMAGES.powerSupply,
    overview: 'Dual-output linear regulated DC bench power supply providing continuous 0-30V DC at up to 3A per channel, with Series Tracking (0-60V/3A), Parallel Tracking (0-30V/6A), and an auxiliary 5V/3A fixed TTL rail.',
    whatIsIt: 'A regulated linear laboratory power supply that steps down 230V AC mains through a multi-tapped toroidal transformer, rectifies and filters the current, and uses high-power pass transistors (2N3055) controlled by precision operational error amplifiers to maintain extremely stable DC output voltages with negligible ripple (<1 mVrms).',
    purposeAndApplications: [
      'Supplying positive and negative dual rails (+15V, 0V, -15V) for operational amplifiers (LM741, TL082).',
      'Powering digital TTL logic circuits via dedicated isolated 5V / 3A rail.',
      'Testing current draw and over-current behavior of newly assembled breadboard circuits.',
      'Constant-current (CC) biasing of power LEDs and charging battery packs safely.'
    ],
    howItWorks: 'The supply operates in two automatic modes: Constant Voltage (CV) and Constant Current (CC). In CV mode, feedback loops monitor the terminal voltage against a Zener reference and throttle pass transistors to keep voltage constant regardless of load resistance. When circuit current reaches the set current threshold, the CC loop takes over, pulling voltage down to protect connected components from over-current burnout.',
    whereItIsUsed: [
      'All Electronics & Telecommunication Labs (Analog, Digital, Microcontroller, Power)',
      'Physics & Basic Electrical Engineering Workbench',
      'Sensor interfacing and transducer excitation stations'
    ],
    operatingProcedure: [
      {
        step: 1,
        title: 'Safety Check & Disconnected Startup',
        instruction: 'NEVER turn on the power supply while it is connected to a circuit under test. Disconnect breadboard banana cables before switching the main rocker switch ON.',
        tip: 'Inspect the banana plugs for bent pins or frayed insulation before insertion.'
      },
      {
        step: 2,
        title: 'Setting Maximum Safe Current Limit',
        instruction: 'Turn the Voltage knob to approx 2V. Momentarily short-circuit the Red (+) and Black (-) terminals using a heavy jumper wire. Rotate the CURRENT knob until the meter reads the desired maximum safe current limit (e.g., 0.2A for IC breadboards). Remove the shorting wire immediately.',
        warning: 'Setting the current knob to maximum (3.0A) removes protection — an incorrect IC connection will instantly fry your silicon chip!'
      },
      {
        step: 3,
        title: 'Voltage Adjustment',
        instruction: 'Rotate the coarse and fine VOLTAGE knobs until the digital LED readout displays the target circuit voltage (e.g. 5.0V for 74-series TTL, or 12.0V for op-amp circuits).'
      },
      {
        step: 4,
        title: 'Dual-Supply Operational Amplifier (+15V / -15V) Setup',
        instruction: 'For dual op-amp power: Press the TRACKING MODE button to "SERIES". Connect a jumper wire between Channel 1 Negative (-) and Channel 2 Positive (+); this joined junction becomes CIRCUIT COMMON (0V / GND). Channel 1 Red is +15V, Channel 2 Black is -15V.',
        tip: 'The Green terminal is Earth Ground (chassis). Connect it to 0V ground to shield low-noise audio circuits.'
      }
    ],
    pinoutAndConnections: {
      diagramType: 'terminal_panel',
      packageType: '4mm Safety Banana Binding Posts',
      pins: [
        {
          number: 'CH1 +',
          name: 'Channel 1 Positive (Red)',
          type: 'power',
          voltageLevel: '+0 to +30 V DC',
          description: 'Master channel positive terminal. Sinks/sources up to 3 Amperes.',
          hotspotCoordinates: { x: 17, y: 75 }
        },
        {
          number: 'CH1 -',
          name: 'Channel 1 Negative (Black)',
          type: 'ground',
          voltageLevel: '0V (Floating relative to Earth)',
          description: 'Master channel negative return terminal.',
          hotspotCoordinates: { x: 25, y: 75 }
        },
        {
          number: 'GND',
          name: 'Chassis Earth Ground (Green)',
          type: 'ground',
          voltageLevel: '0V Mains Earth',
          description: 'Connected directly to building mains earth for shielding and static discharge.',
          hotspotCoordinates: { x: 33, y: 75 }
        },
        {
          number: 'CH2 +',
          name: 'Channel 2 Positive (Red)',
          type: 'power',
          voltageLevel: '+0 to +30 V DC',
          description: 'Slave channel positive output terminal in tracking modes.',
          hotspotCoordinates: { x: 63, y: 75 }
        },
        {
          number: 'CH2 -',
          name: 'Channel 2 Negative (Black)',
          type: 'ground',
          voltageLevel: '0V (Floating)',
          description: 'Slave channel negative return terminal.',
          hotspotCoordinates: { x: 71, y: 75 }
        }
      ],
      wiringRules: [
        'Always connect Ground (Black) first, then Positive (Red) when wiring circuits.',
        'Never reverse polarity on electrolytic capacitors or IC power pins (VCC/GND).'
      ]
    },
    technicalSpecs: [
      { property: 'Output Voltage (CH1 & CH2)', value: '0 - 30', unit: 'V DC continuously variable' },
      { property: 'Output Current (CH1 & CH2)', value: '0 - 3', unit: 'A continuously variable' },
      { property: 'Fixed Auxiliary Output', value: '5.0 V ±1% @ 3.0', unit: 'A' },
      { property: 'Line Regulation', value: '≤ 0.01% + 2', unit: 'mV' },
      { property: 'Load Regulation', value: '≤ 0.01% + 3', unit: 'mV' },
      { property: 'Ripple & Noise', value: '< 1.0', unit: 'mV RMS' },
      { property: 'Tracking Modes', value: 'Independent, Series (60V/3A), Parallel (30V/6A)', unit: '' }
    ],
    safetyPrecautions: [
      {
        severity: 'critical',
        text: 'Never short-circuit power rails with current limit set to maximum.',
        rationale: 'A 3A short across thin 24 AWG breadboard jumper wires will cause insulation to melt, smoke, and spark.'
      },
      {
        severity: 'critical',
        text: 'Double-check VCC and GND polarity on integrated circuits before powering.',
        rationale: 'Reversed polarity instantaneously destroys TTL and CMOS integrated circuits via latch-up.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'The voltage meter stays at 0V even when turning the Voltage knob.',
        consequence: 'Student thinks power supply is broken.',
        fix: 'The CURRENT knob is turned completely counter-clockwise to zero, locking the unit into CC mode. Turn current knob slightly clockwise.'
      },
      {
        mistake: 'Red Constant Current (CC) indicator LED lights up while circuit is running.',
        consequence: 'Output voltage drops drastically, circuit misbehaves.',
        fix: 'The circuit is drawing more current than the configured limit, or there is an accidental short on the breadboard.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Voltage drops suddenly when circuit is turned on.',
        probableCause: 'Load resistance is too low, tripping the Current Limit threshold.',
        remedy: 'Power down and inspect breadboard for short circuits, backward ICs, or low-value pull-down resistors.'
      }
    ],
    relatedComponents: [
      {
        id: 'eq-dmm-fluke',
        name: 'Fluke 115 Digital Multimeter',
        relationType: 'pairs_with',
        note: 'Used to measure circuit current consumption in series with the power supply rail.'
      }
    ],
    labManualReference: {
      manualTitle: 'AIT E&TC Laboratory Manual: Basic Electronics Engineering (BXE102)',
      experimentNumber: 'Exp 01',
      experimentName: 'Familiarization with Regulated DC Power Supplies and Breadboard Prototyping Safety Rules',
      courseCode: 'BXE102',
      pageReference: 'Pages 1-8'
    }
  },

  {
    id: 'eq-dmm-fluke',
    assetCode: 'AIT-ENTC-DEL-089',
    name: 'Fluke 115 True-RMS Digital Multimeter',
    shortName: 'Fluke 115 Digital Multimeter',
    aliases: ['DMM', 'Multimeter', 'Digital Multitester', 'AVO Meter', 'Fluke Meter'],
    category: 'instrument',
    model: 'Fluke 115 True RMS Multi-Meter',
    manufacturer: 'Fluke Corporation',
    institutionId: 'ait-pune',
    departmentId: 'dept-entc',
    labId: 'lab-entc-del',
    benchLocation: 'Bench 4, Tool Drawer',
    status: 'verified',
    lastReviewedDate: '2026-03-05',
    verifiedBy: 'Dr. P. B. Karandikar',
    reviewerDesignation: 'Associate Professor & Lab In-Charge, E&TC',
    imageUrl: EQUIPMENT_IMAGES.multimeter,
    thumbnailUrl: EQUIPMENT_IMAGES.multimeter,
    overview: 'Compact True-RMS digital multimeter for electronic troubleshooting, measuring AC/DC voltage up to 600V, AC/DC current up to 10A, resistance, continuity, diode drop, and capacitance with 6000-count resolution.',
    whatIsIt: 'A precision portable digital multimeter that converts electrical quantities into digital numbers via dual-slope integrating ADC. Unlike cheap average-responding meters, True-RMS calculation computes the true effective heating value of non-sinusoidal waveforms (such as triangular, chopped, or PWM square waves) without mathematical error.',
    purposeAndApplications: [
      'Verifying power rail voltages on breadboards (+5.0V, ±12V).',
      'Audible continuity testing to discover open traces and accidental solder bridges.',
      'Checking forward bias diode drops (0.6V-0.7V for Silicon, 0.2V for Schottky).',
      'Measuring resistor values with 0.1 Ω resolution before insertion.',
      'Checking current draw in circuit loops.'
    ],
    howItWorks: 'Voltage inputs pass through high-precision matched thin-film resistor dividers (10 MΩ input impedance). Current measurements pass through low-resistance precision manganin current shunts (producing a tiny millivolt drop measured by the ADC). A dedicated True-RMS converter IC continuously squares, averages, and takes the square root of the analog signal in real time.',
    whereItIsUsed: [
      'All engineering laboratories (ENTC, Mechanical, Computer hardware)',
      'Field diagnostics, bench assembly, and component bin sorting'
    ],
    operatingProcedure: [
      {
        step: 1,
        title: 'Jack Lead Placement (CRITICAL RULE)',
        instruction: 'Black probe ALWAYS plugs into COM (Common). Red probe plugs into the Right Jack (V-Ω-Diode) for 99% of measurements. ONLY plug Red into the Left (10A) Jack when measuring current in series.',
        warning: 'NEVER measure voltage with the Red lead plugged into the 10A Jack! The 10A port is a DEAD SHORT to ground and will blow the internal 11A ceramic fuse instantly!'
      },
      {
        step: 2,
        title: 'Measuring DC/AC Voltage (Parallel Connection)',
        instruction: 'Turn rotary dial to VDC (⎓) or VAC (~). Place probes in PARALLEL across the two points whose potential difference you wish to measure.',
        tip: 'The meter is high-impedance (10 MΩ), meaning it does not alter circuit behavior during voltage measurement.'
      },
      {
        step: 3,
        title: 'Measuring Current (Series Connection)',
        instruction: 'BREAK the circuit connection. Move Red lead to the 10A jack. Set rotary switch to Amps. Insert multimeter probes in SERIES so that current flows through the meter.',
        warning: 'Never connect current probes across a battery or power supply!'
      },
      {
        step: 4,
        title: 'Continuity & Diode Testing',
        instruction: 'Turn dial to the Beeper/Diode symbol. Touch probes together; a loud beep confirms continuity. Place Red on diode Anode and Black on Cathode; display will show ~0.65V for Silicon.',
        tip: 'ALWAYS ensure circuit power is completely switched OFF before taking resistance or continuity measurements.'
      }
    ],
    pinoutAndConnections: {
      diagramType: 'terminal_panel',
      packageType: '4mm Shrouded Safety Banana Jacks',
      pins: [
        {
          number: '10A',
          name: '10A Current Input (Fused)',
          type: 'input',
          voltageLevel: '10A continuous (20A overload for 30s)',
          description: 'Protected by 11A 1000V fast-acting ceramic fuse. For series current measurements only.',
          hotspotCoordinates: { x: 39, y: 78 }
        },
        {
          number: 'COM',
          name: 'Common Return (Ground)',
          type: 'ground',
          voltageLevel: 'Reference 0V',
          description: 'Black lead terminal connected to instrument circuit ground.',
          hotspotCoordinates: { x: 50, y: 78 }
        },
        {
          number: 'V-Ω',
          name: 'Voltage, Resistance & Diode Jack',
          type: 'input',
          voltageLevel: 'Max 600V CAT III',
          description: 'Red lead terminal for Volts, Ohms, Continuity, Capacitance, and Diode tests.',
          hotspotCoordinates: { x: 61, y: 78 }
        }
      ],
      wiringRules: [
        'Voltage is measured in PARALLEL.',
        'Current is measured in SERIES.',
        'Resistance is measured on UNPOWERED components only.'
      ]
    },
    technicalSpecs: [
      { property: 'Max Voltage Rating', value: '600', unit: 'V AC/DC CAT III' },
      { property: 'Max Current Rating', value: '10', unit: 'A AC/DC continuous' },
      { property: 'Display Resolution', value: '6,000', unit: 'counts with 33-segment bargraph' },
      { property: 'Resistance Range', value: '0.1 Ω to 40', unit: 'MΩ' },
      { property: 'Capacitance Range', value: '1 nF to 9,999', unit: 'µF' },
      { property: 'Input Impedance', value: '10', unit: 'MΩ (< 100 pF)' },
      { property: 'Continuity Beeper Threshold', value: '< 20', unit: 'Ω' }
    ],
    safetyPrecautions: [
      {
        severity: 'critical',
        text: 'Never measure voltage while the test leads are in the 10A current jack.',
        rationale: 'The 10A shunt acts as a zero-ohm short circuit. Applying mains or power supply across it destroys the fuse and causes arc flashes.'
      },
      {
        severity: 'warning',
        text: 'Do not measure resistance on a live circuit.',
        rationale: 'Active circuit voltage biases the internal reference currents and can damage the resistor network.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Leaving red lead in 10A socket and attempting to check 5V power rail.',
        consequence: 'Shorts the power supply, blows the multimeter internal fuse.',
        fix: 'Form a reflex: immediately return Red probe to the V-Ω socket after any current test.'
      },
      {
        mistake: 'Reading resistance while resistor is still wired into a complex circuit.',
        consequence: 'Parallel circuit paths create a false low reading.',
        fix: 'Lift one leg of the resistor off the breadboard before measuring.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Current measurement always reads 0.000A.',
        probableCause: 'Internal 11A fuse is blown from a previous overload.',
        remedy: 'Switch dial to Ohms. Insert a probe into the 10A jack and touch the other to the V-Ω jack. If it reads open circuit (OL), replace fuse with Fluke PN 803293.'
      }
    ],
    relatedComponents: [
      {
        id: 'eq-rps-scientific',
        name: 'Scientific DC Power Supply',
        relationType: 'pairs_with',
        note: 'Calibrated using DMM voltage and current scales.'
      }
    ],
    labManualReference: {
      manualTitle: 'AIT E&TC Laboratory Manual: Basic Electronics Engineering (BXE102)',
      experimentNumber: 'Exp 02',
      experimentName: 'Testing and Identification of Active and Passive Electronic Components using Digital Multimeter',
      courseCode: 'BXE102',
      pageReference: 'Pages 9-16'
    }
  },

  {
    id: 'eq-ic-ne555',
    assetCode: 'AIT-ENTC-DEL-IC05',
    name: 'NE555 Precision Timer IC (8-Pin DIP)',
    shortName: 'NE555 Timer IC',
    aliases: ['555 Timer', 'LM555', 'Timer IC', '555 Multivibrator', 'NE555P'],
    category: 'ic_component',
    model: 'Texas Instruments NE555P (DIP-8 Package)',
    manufacturer: 'Texas Instruments',
    institutionId: 'ait-pune',
    departmentId: 'dept-entc',
    labId: 'lab-entc-del',
    benchLocation: 'Component Storage Cabinet C, Drawer 05',
    status: 'verified',
    lastReviewedDate: '2026-03-01',
    verifiedBy: 'Dr. P. B. Karandikar',
    reviewerDesignation: 'Associate Professor & Lab In-Charge, E&TC',
    imageUrl: EQUIPMENT_IMAGES.ne555,
    thumbnailUrl: EQUIPMENT_IMAGES.ne555,
    overview: 'Legendary 8-pin precision timing integrated circuit capable of producing stable microsecond to hour-long time delays, clock oscillations, and PWM signals in Astable, Monostable, and Bistable configurations.',
    whatIsIt: 'The NE555 is a monolithic timing circuit introduced in 1972 by Signetics (Hans Camenzind). It contains 25 transistors, 2 diodes, and three precisely matched 5 kΩ internal voltage divider resistors (from which it derives its name "555"), creating 1/3 Vcc and 2/3 Vcc reference thresholds for internal comparators driving an SR latch.',
    purposeAndApplications: [
      'Astable multivibrator clock generation (square wave oscillation for digital circuits).',
      'Monostable one-shot pulse stretcher for switch debouncing and delay timers.',
      'Pulse-Width Modulation (PWM) for DC motor speed control and LED dimming.',
      'Missing pulse detectors and tachometer signal conditioning.',
      'Tone generators, sirens, and frequency-shift keying.'
    ],
    howItWorks: 'An internal resistor divider sets Comparator 1 inverting input to 2/3 Vcc and Comparator 2 non-inverting input to 1/3 Vcc. In Astable mode, an external capacitor charges through (RA + RB). When capacitor voltage crosses 2/3 Vcc, Comparator 1 triggers the SR flip-flop to RESET: the output (pin 3) goes LOW, and the internal discharge transistor turns ON, discharging the capacitor through RB into Pin 7. When the capacitor drops below 1/3 Vcc, Comparator 2 SETS the flip-flop: pin 3 goes HIGH, discharge transistor turns OFF, and the cycle repeats indefinitely.',
    whereItIsUsed: [
      'Digital Electronics Lab (Clock generators for decade counters 7490, 74193)',
      'Analog Integrated Circuits Lab (IC555 Astable and Monostable characterization)',
      'Hobby robotics and autonomous sensor timers'
    ],
    operatingProcedure: [
      {
        step: 1,
        title: 'Package Orientation & Pin 1 Identification',
        instruction: 'Locate the half-moon notch or laser dot at the top edge of the plastic package. With the notch facing UP, Pin 1 is the top-left pin. Pins are numbered counter-clockwise from 1 to 4 down the left, and 5 to 8 up the right.',
        tip: 'Pin 1 is Ground; Pin 8 is VCC (+4.5V to +15V).'
      },
      {
        step: 2,
        title: 'Wiring Pin 4 (RESET) and Pin 5 (CONTROL)',
        instruction: 'CRITICAL RULE: Always tie Pin 4 (RESET) directly to Pin 8 (VCC) if not explicitly using external reset. Always connect a 0.01 µF ceramic capacitor between Pin 5 (Control) and Pin 1 (GND).',
        warning: 'Leaving Pin 4 floating will cause random, intermittent resets due to electrical noise!'
      },
      {
        step: 3,
        title: 'Astable Oscillator Component Calculations',
        instruction: 'Connect resistor RA from Pin 8 to Pin 7. Connect resistor RB from Pin 7 to Pin 6. Tie Pin 6 (Threshold) to Pin 2 (Trigger). Connect timing capacitor C between Pin 2 and Pin 1 (GND).',
        tip: 'Frequency f = 1.44 / ((RA + 2*RB) * C). High time Th = 0.693 * (RA + RB) * C. Low time Tl = 0.693 * RB * C.'
      },
      {
        step: 4,
        title: 'Connecting the Output (Pin 3)',
        instruction: 'Pin 3 can both source and sink up to 200 mA. To drive an LED, connect a 330 Ω series resistor from Pin 3 to Ground (LED lights when HIGH).'
      }
    ],
    pinoutAndConnections: {
      diagramType: 'ic_pinout',
      packageType: 'DIP-8 (Dual In-line Package)',
      pins: [
        {
          number: '1',
          name: 'GND',
          type: 'ground',
          voltageLevel: '0V',
          description: 'Ground reference voltage for all internal logic and transistors.',
          hotspotCoordinates: { x: 20, y: 26 }
        },
        {
          number: '2',
          name: 'TRIG',
          type: 'input',
          voltageLevel: 'Active Low (< 1/3 Vcc)',
          description: 'Trigger input. When voltage falls below 1/3 Vcc, internal flip-flop sets and Output goes HIGH.',
          hotspotCoordinates: { x: 20, y: 40 }
        },
        {
          number: '3',
          name: 'OUT',
          type: 'output',
          voltageLevel: '0.1V (Low) to (Vcc - 1.5V) (High)',
          description: 'Output push-pull buffer capable of sourcing or sinking up to 200mA.',
          hotspotCoordinates: { x: 20, y: 53 }
        },
        {
          number: '4',
          name: 'RESET',
          type: 'input',
          voltageLevel: 'Active Low (< 0.7V)',
          description: 'Active-low reset. Overrides all inputs and forces Pin 3 LOW. Tie to VCC when unused.',
          hotspotCoordinates: { x: 20, y: 67 }
        },
        {
          number: '5',
          name: 'CONT',
          type: 'analog',
          voltageLevel: 'Nominally 2/3 Vcc',
          description: 'Control voltage terminal. Bypassed to GND with 10nF capacitor to eliminate noise.',
          hotspotCoordinates: { x: 80, y: 67 }
        },
        {
          number: '6',
          name: 'THRES',
          type: 'input',
          voltageLevel: 'Active High (> 2/3 Vcc)',
          description: 'Threshold input. When voltage rises above 2/3 Vcc, resets flip-flop and forces Pin 3 LOW.',
          hotspotCoordinates: { x: 80, y: 53 }
        },
        {
          number: '7',
          name: 'DISCH',
          type: 'output',
          voltageLevel: 'Open Collector NPN',
          description: 'Discharge pin connected to internal NPN transistor collector. Drains timing capacitor.',
          hotspotCoordinates: { x: 80, y: 40 }
        },
        {
          number: '8',
          name: 'VCC',
          type: 'power',
          voltageLevel: '+4.5V to +16.0V DC',
          description: 'Positive supply voltage pin.',
          hotspotCoordinates: { x: 80, y: 26 }
        }
      ],
      wiringRules: [
        'Never reverse Pin 1 and Pin 8 (burns internal substrate diodes).',
        'Tie Pin 4 directly to Pin 8 unless controlled by external logic.',
        'Always decouple Pin 5 with a 10 nF capacitor.'
      ]
    },
    technicalSpecs: [
      { property: 'Supply Voltage (Vcc)', value: '4.5 to 16.0', unit: 'V DC' },
      { property: 'Supply Current (Vcc = 5V)', value: '3 to 6', unit: 'mA' },
      { property: 'Max Output Source/Sink Current', value: '200', unit: 'mA' },
      { property: 'Max Operating Frequency', value: '500', unit: 'kHz' },
      { property: 'Timing Error (Astable Drift)', value: '< 1.5%', unit: 'across temperature' },
      { property: 'Internal Resistor Value', value: '3 x 5', unit: 'kΩ (±20% tolerance)' },
      { property: 'Operating Temperature', value: '0 to 70', unit: '°C' }
    ],
    safetyPrecautions: [
      {
        severity: 'critical',
        text: 'Do not exceed 16V on Pin 8.',
        rationale: 'Voltages exceeding absolute maximum ratings break down internal collector-base junctions.'
      },
      {
        severity: 'warning',
        text: 'Do not connect Pin 7 directly to VCC without a current-limiting resistor RA.',
        rationale: 'When Pin 7 discharges, it shorts to ground. Without RA (min 1kΩ), infinite current burns the discharge NPN.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Leaving Pin 4 (RESET) floating in air.',
        consequence: 'Electromagnetic noise from nearby lights or hands randomly resets the timer, halting oscillation.',
        fix: 'Hard-wire Pin 4 directly to Pin 8 (VCC).'
      },
      {
        mistake: 'Inserting the IC backwards into the breadboard (Pin 1 where Pin 5 should be).',
        consequence: 'Applies VCC to Ground and Ground to Control, heating up the IC and destroying it.',
        fix: 'Check the half-moon notch is pointing left/up before plugging into the breadboard center trough.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Circuit never oscillates; Pin 3 stays permanently HIGH or LOW.',
        probableCause: 'Pin 2 and Pin 6 are not tied together, or capacitor C is shorted/backwards.',
        remedy: 'Verify jumper wire bridges Pin 2 to Pin 6. Check polarity on electrolytic timing capacitor.'
      }
    ],
    relatedComponents: [
      {
        id: 'eq-dso-tek',
        name: 'Tektronix TBS1052B Oscilloscope',
        relationType: 'pairs_with',
        note: 'Used to measure output frequency and verify capacitor exponential charge curves on Pin 6.'
      },
      {
        id: 'eq-ic-7408',
        name: '7408 AND Gate IC',
        relationType: 'pairs_with',
        note: '555 timer output clock can drive TTL logic gate clock inputs.'
      }
    ],
    labManualReference: {
      manualTitle: 'AIT E&TC Laboratory Manual: Integrated Circuits & Applications (ET301)',
      experimentNumber: 'Exp 04',
      experimentName: 'Design and Implementation of Astable and Monostable Multivibrators using IC 555',
      courseCode: 'ET301',
      pageReference: 'Pages 30-38'
    }
  },

  {
    id: 'eq-esp32-devkit',
    assetCode: 'AIT-ENTC-IOT-012',
    name: 'ESP32 NodeMCU Development Board (30-Pin)',
    shortName: 'ESP32 DevKit Board',
    aliases: ['ESP32', 'NodeMCU-32S', 'ESP-WROOM-32', 'IoT Controller', 'Espressif MCU'],
    category: 'trainer_kit',
    model: 'NodeMCU ESP-WROOM-32 (30-pin DIP form factor)',
    manufacturer: 'Espressif Systems',
    institutionId: 'ait-pune',
    departmentId: 'dept-entc',
    labId: 'lab-entc-iot',
    benchLocation: 'Bench 2, Tray IoT-A',
    status: 'verified',
    lastReviewedDate: '2026-03-14',
    verifiedBy: 'Prof. R. S. Gaikwad',
    reviewerDesignation: 'Assistant Professor, IoT & Embedded Lab',
    imageUrl: EQUIPMENT_IMAGES.esp32,
    thumbnailUrl: EQUIPMENT_IMAGES.esp32,
    overview: 'High-performance dual-core 32-bit Xtensa LX6 microcontroller running at 240 MHz with built-in 802.11 b/g/n Wi-Fi, Bluetooth v4.2 BR/EDR and BLE, 520 KB SRAM, and 30 breadboard-friendly breakout pins.',
    whatIsIt: 'The ESP32 is a feature-packed system-on-a-chip (SoC) designed for mobile, wearable electronics, and IoT applications. It combines ultra-low power consumption with robust wireless connectivity, cryptographic hardware acceleration (AES, SHA, RSA, ECC), multiple ADCs, DACs, touch sensors, I2C, SPI, and PWM controllers.',
    purposeAndApplications: [
      'Edge computing and telemetry nodes sending sensor data over MQTT / HTTP.',
      'Bluetooth Low Energy (BLE) peripheral beacons and environmental trackers.',
      'Real-time industrial automation, robotics, and motor control via MCPWM.',
      'Web-server dashboard hosting for remote laboratory monitoring.'
    ],
    howItWorks: 'The board integrates an ESP-WROOM-32 module with PCB trace antenna, a 3.3V Low-Dropout (LDO) voltage regulator (AMS1117-3.3), and a Silicon Labs CP2102 or CH340 USB-to-UART bridge. When connected via micro-USB, your development computer streams compiled binary firmware over serial UART into on-board 4MB SPI Flash memory.',
    whereItIsUsed: [
      'Microcontrollers & Embedded Systems Lab',
      'Internet of Things (IoT) Capstone Projects',
      'Wireless sensor networking and Smart Campus testbeds'
    ],
    operatingProcedure: [
      {
        step: 1,
        title: 'Driver Installation & Cable Verification',
        instruction: 'Use a high-quality data-capable micro-USB cable (many cheap cables are power-only!). Install the CP2102 or CH340 USB-to-UART bridge VCP driver on your laptop.',
        tip: 'In Device Manager, verify a new COM Port appears under "Ports (COM & LPT)".'
      },
      {
        step: 2,
        title: 'Logic Level Voltage Rules (3.3V ONLY)',
        instruction: 'CRITICAL WARNING: The ESP32 is a 3.3V logic device. GPIO pins are NOT 5V TOLERANT. Connecting 5V sensors directly to GPIO pins will fry the silicon substrate.',
        warning: 'Use a bidirectional logic level shifter (or simple resistive voltage divider) whenever interfacing with 5V components like ultrasonic sensors (HC-SR04) or 5V Arduino boards.'
      },
      {
        step: 3,
        title: 'Firmware Upload / Boot Mode',
        instruction: 'In Arduino IDE / PlatformIO, select board "ESP32 Dev Module". If upload hangs at "Connecting........_____", press and hold the physical "BOOT" button on the board until flashing starts.',
        tip: 'Add a 10 µF electrolytic capacitor between the EN pin and GND to enable automatic reset without manual BOOT button pressing.'
      }
    ],
    pinoutAndConnections: {
      diagramType: 'ic_pinout',
      packageType: '30-Pin Dual Header Breadboard Breakout',
      pins: [
        {
          number: '3V3',
          name: '3.3V Power Output',
          type: 'power',
          voltageLevel: '+3.3V DC (Max 600mA)',
          description: 'Regulated 3.3V power output from onboard LDO regulator. Powers external 3.3V sensors.',
          hotspotCoordinates: { x: 30, y: 15 }
        },
        {
          number: 'GND',
          name: 'Ground Pins (Multiple)',
          type: 'ground',
          voltageLevel: '0V',
          description: 'Common ground return.',
          hotspotCoordinates: { x: 30, y: 22 }
        },
        {
          number: 'GPIO 2',
          name: 'GPIO2 / Onboard Blue LED',
          type: 'bidirectional',
          voltageLevel: '3.3V CMOS Logic',
          description: 'Strapping pin connected to the onboard blue LED. Must be left floating during boot.',
          hotspotCoordinates: { x: 30, y: 45 }
        },
        {
          number: 'GPIO 21',
          name: 'SDA (I2C Data)',
          type: 'bidirectional',
          voltageLevel: '3.3V',
          description: 'Default hardware I2C data bus line. Connects to OLED displays and IMU sensors.',
          hotspotCoordinates: { x: 70, y: 65 }
        },
        {
          number: 'GPIO 22',
          name: 'SCL (I2C Clock)',
          type: 'output',
          voltageLevel: '3.3V',
          description: 'Default hardware I2C clock line.',
          hotspotCoordinates: { x: 70, y: 70 }
        },
        {
          number: 'VIN',
          name: 'External 5V Power Input',
          type: 'power',
          voltageLevel: '+5.0V DC (External Supply)',
          description: 'Input to the onboard 3.3V regulator when not powering via USB cable.',
          hotspotCoordinates: { x: 70, y: 15 }
        }
      ],
      wiringRules: [
        'GPIO pins 34, 35, 36, and 39 are INPUT-ONLY (no internal pull-up/pull-down resistors).',
        'Never exceed 12 mA drive current per GPIO pin.',
        'Never apply 5V logic signals to ESP32 GPIOs.'
      ]
    },
    technicalSpecs: [
      { property: 'Microprocessor', value: 'Xtensa Dual-Core 32-bit LX6', unit: '@ 240 MHz' },
      { property: 'Flash Memory', value: '4', unit: 'MB SPI Flash' },
      { property: 'Internal SRAM', value: '520', unit: 'KB' },
      { property: 'Wi-Fi Standard', value: '802.11 b/g/n', unit: '(up to 150 Mbps)' },
      { property: 'Bluetooth', value: 'v4.2 BR/EDR and BLE', unit: '' },
      { property: 'ADC Resolution', value: '12-bit', unit: '(up to 18 channels)' },
      { property: 'DAC Channels', value: '2 x 8-bit', unit: 'analog outputs' },
      { property: 'Logic Level', value: '3.3', unit: 'V' }
    ],
    safetyPrecautions: [
      {
        severity: 'critical',
        text: 'Do NOT feed 5V signals directly to GPIO input pins.',
        rationale: 'Overvoltage punches through gate oxide in the 40nm TSMC silicon process.'
      },
      {
        severity: 'warning',
        text: 'Ensure power supply can deliver at least 500mA during Wi-Fi transmission bursts.',
        rationale: 'Wi-Fi RF calibration draws sudden current spikes; weak USB ports trigger brownout resets.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using GPIO 6 to 11 for sensor connections.',
        consequence: 'Instant crash or boot-loop.',
        fix: 'Pins 6-11 are internally bonded to the external SPI flash chip holding program memory. Never connect anything to them.'
      },
      {
        mistake: 'Reading analog voltages on ADC2 while Wi-Fi is active.',
        consequence: 'ADC2 reads random zero values.',
        fix: 'The Wi-Fi driver shares ADC2 circuitry. Use ADC1 pins (GPIO 32 to 39) for analog readings when Wi-Fi is running.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Serial monitor outputs gibberish characters like "rst:0x1 (POWERON_RESET)".',
        probableCause: 'Serial monitor baud rate mismatch.',
        remedy: 'ESP32 bootloader communicates at 115200 baud. Set your serial terminal baud rate dropdown to 115200.'
      }
    ],
    relatedComponents: [
      {
        id: 'eq-rps-scientific',
        name: 'Scientific DC Power Supply',
        relationType: 'pairs_with',
        note: 'Provides clean 5V auxiliary power to the VIN pin for standalone sensor deployments.'
      }
    ],
    labManualReference: {
      manualTitle: 'AIT E&TC Laboratory Manual: Embedded Systems & RTOS (ET402)',
      experimentNumber: 'Exp 03',
      experimentName: 'Interfacing Sensors and Cloud Telemetry using ESP32 Microcontroller',
      courseCode: 'ET402',
      pageReference: 'Pages 25-34'
    }
  },

  {
    id: 'eq-ic-7408',
    assetCode: 'AIT-ENTC-DEL-IC7408',
    name: 'SN74LS08N Quad 2-Input AND Gate IC (14-Pin DIP)',
    shortName: '7408 Quad AND Gate',
    aliases: ['7408', '74LS08', 'Quad AND Gate', 'TTL AND IC', '74HC08'],
    category: 'ic_component',
    model: 'Texas Instruments SN74LS08N (Low-Power Schottky TTL)',
    manufacturer: 'Texas Instruments',
    institutionId: 'ait-pune',
    departmentId: 'dept-entc',
    labId: 'lab-entc-del',
    benchLocation: 'Component Storage Cabinet A, Drawer 08',
    status: 'verified',
    lastReviewedDate: '2026-03-02',
    verifiedBy: 'Dr. P. B. Karandikar',
    reviewerDesignation: 'Associate Professor & Lab In-Charge, E&TC',
    imageUrl: EQUIPMENT_IMAGES.ic7408,
    thumbnailUrl: EQUIPMENT_IMAGES.ic7408,
    overview: 'Standard digital logic integrated circuit containing four independent 2-input positive-AND logic gates implemented in Low-Power Schottky bipolar TTL technology.',
    whatIsIt: 'The 7408 is a member of the iconic 7400 series digital logic family. It performs the Boolean algebraic product Y = A • B. Each of the four internal gates operates independently, switching logic states within 9 to 15 nanoseconds.',
    purposeAndApplications: [
      'Realizing fundamental Boolean expressions and combinational logic circuits.',
      'Enabling and gating clock signals into counters and flip-flops.',
      'Address decoding in microprocessor memory mapping.',
      'Parity checking and digital comparator synthesis.'
    ],
    howItWorks: 'The LS (Low-Power Schottky) architecture uses Schottky clamped bipolar junction transistors. When both inputs A and B are driven HIGH (> 2.0V), the input diodes reverse-bias, routing base current to the phase-splitter transistor, which drives the totem-pole output stage HIGH (~3.4V). If either input is pulled LOW (< 0.8V), the corresponding input diode conducts, starving the output transistor and pulling the output pin LOW (~0.2V).',
    whereItIsUsed: [
      'Digital Electronics & Logic Design Lab (Combinational logic experiments, Adder/Subtractor circuits)',
      'Basic Electrical Engineering Lab'
    ],
    operatingProcedure: [
      {
        step: 1,
        title: 'Power Supply Verification',
        instruction: 'TTL logic requires EXACTLY 5.0V ± 0.25V DC. Connect Pin 14 to +5V and Pin 7 to 0V (Ground).',
        warning: 'Voltages exceeding 5.5V permanently damage TTL chips!'
      },
      {
        step: 2,
        title: 'Gate Selection and Input Wiring',
        instruction: 'Choose Gate 1: Connect inputs to Pin 1 (1A) and Pin 2 (1B). Connect output Pin 3 (1Y) to a logic probe or an LED indicator via a 330Ω resistor to ground.'
      },
      {
        step: 3,
        title: 'Verifying Truth Table',
        instruction: 'Apply logic inputs: (0,0 -> 0), (0,1 -> 0), (1,0 -> 0), (1,1 -> 1). Confirm LED only lights when both inputs are at +5V.',
        tip: 'In TTL logic, a floating unconnected input acts as a logic HIGH due to internal pull-up circuitry. Always tie unused inputs to GND or VCC.'
      }
    ],
    pinoutAndConnections: {
      diagramType: 'ic_pinout',
      packageType: 'DIP-14 (Dual In-line 14 Pins)',
      pins: [
        { number: '1', name: '1A', type: 'input', description: 'Gate 1 Input A', hotspotCoordinates: { x: 15, y: 22 } },
        { number: '2', name: '1B', type: 'input', description: 'Gate 1 Input B', hotspotCoordinates: { x: 15, y: 32 } },
        { number: '3', name: '1Y', type: 'output', description: 'Gate 1 Output (Y = A • B)', hotspotCoordinates: { x: 15, y: 42 } },
        { number: '4', name: '2A', type: 'input', description: 'Gate 2 Input A', hotspotCoordinates: { x: 15, y: 52 } },
        { number: '5', name: '2B', type: 'input', description: 'Gate 2 Input B', hotspotCoordinates: { x: 15, y: 62 } },
        { number: '6', name: '2Y', type: 'output', description: 'Gate 2 Output', hotspotCoordinates: { x: 15, y: 72 } },
        { number: '7', name: 'GND', type: 'ground', description: 'Ground (0V) pin', hotspotCoordinates: { x: 15, y: 82 } },
        { number: '8', name: '3Y', type: 'output', description: 'Gate 3 Output', hotspotCoordinates: { x: 85, y: 82 } },
        { number: '9', name: '3A', type: 'input', description: 'Gate 3 Input A', hotspotCoordinates: { x: 85, y: 72 } },
        { number: '10', name: '3B', type: 'input', description: 'Gate 3 Input B', hotspotCoordinates: { x: 85, y: 62 } },
        { number: '11', name: '4Y', type: 'output', description: 'Gate 4 Output', hotspotCoordinates: { x: 85, y: 52 } },
        { number: '12', name: '4A', type: 'input', description: 'Gate 4 Input A', hotspotCoordinates: { x: 85, y: 42 } },
        { number: '13', name: '4B', type: 'input', description: 'Gate 4 Input B', hotspotCoordinates: { x: 85, y: 32 } },
        { number: '14', name: 'VCC', type: 'power', description: '+5V Power Supply pin', hotspotCoordinates: { x: 85, y: 22 } }
      ],
      wiringRules: [
        'VCC is Pin 14; GND is Pin 7 (standard TTL corner pin arrangement).',
        'Never short logic outputs together.'
      ]
    },
    technicalSpecs: [
      { property: 'Supply Voltage (Vcc)', value: '4.75 to 5.25', unit: 'V DC' },
      { property: 'High-Level Input Voltage (VIH)', value: '≥ 2.0', unit: 'V' },
      { property: 'Low-Level Input Voltage (VIL)', value: '≤ 0.8', unit: 'V' },
      { property: 'Propagation Delay Time (tpd)', value: '9', unit: 'ns typical' },
      { property: 'Output Drive Current (IOH / IOL)', value: '-0.4 mA / 8 mA', unit: '' }
    ],
    safetyPrecautions: [
      {
        severity: 'critical',
        text: 'Do not connect supply to 12V or 15V rails.',
        rationale: 'TTL ICs have an absolute maximum rating of 7.0V. Applying 12V will rupture the plastic package.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Connecting VCC to Pin 1 instead of Pin 14.',
        consequence: 'Shorts the gate input; IC fails to power.',
        fix: 'Observe the orientation notch at the top; Pin 14 is top right, Pin 7 is bottom left.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Gate output always stays HIGH (~3.5V).',
        probableCause: 'Input wires are disconnected and floating.',
        remedy: 'In TTL logic, floating inputs pull HIGH. Connect inputs explicitly to 0V Ground with a jumper to verify LOW state.'
      }
    ],
    relatedComponents: [
      {
        id: 'eq-ic-ne555',
        name: 'NE555 Timer IC',
        relationType: 'pairs_with',
        note: 'Can supply clock pulses into the 7408 AND gate for pulse synchronization.'
      }
    ],
    labManualReference: {
      manualTitle: 'AIT E&TC Laboratory Manual: Digital Electronics (ET203)',
      experimentNumber: 'Exp 01',
      experimentName: 'Verification of Truth Tables of Basic Logic Gates and Universal Gates',
      courseCode: 'ET203',
      pageReference: 'Pages 4-10'
    }
  },

  {
    id: 'eq-sensor-lvdt',
    assetCode: 'AIT-MECH-TRON-003',
    name: 'LVDT Linear Displacement Transducer Calibration Bench',
    shortName: 'LVDT Displacement Setup',
    aliases: ['LVDT', 'Linear Variable Differential Transformer', 'Displacement Sensor Trainer', 'LVDT Kit'],
    category: 'sensor',
    model: 'ME-LVDT-100 Precision Calibration Bench (±10 mm Range)',
    manufacturer: 'Tech-Ed Systems / AIT Fabrication',
    institutionId: 'ait-pune',
    departmentId: 'dept-mech',
    labId: 'lab-mech-inst',
    benchLocation: 'Station 2, Mechatronics Laboratory',
    status: 'verified',
    lastReviewedDate: '2026-03-09',
    verifiedBy: 'Dr. J. D. Patil',
    reviewerDesignation: 'Associate Professor & Lab In-Charge, Mechatronics',
    imageUrl: EQUIPMENT_IMAGES.lvdt,
    thumbnailUrl: EQUIPMENT_IMAGES.lvdt,
    overview: 'Electromechanical inductive transducer test bench that converts linear physical displacement of a ferromagnetic core into a proportional differential alternating voltage, with calibrated micrometer feed and digital readout.',
    whatIsIt: 'A Linear Variable Differential Transformer (LVDT) is a non-contact passive inductive transducer consisting of one primary winding energized by an AC carrier signal and two symmetrical secondary windings connected in series opposition. When a high-permeability nickel-iron core slides through the cylindrical bore, magnetic flux linkage changes differentially, producing an output voltage whose amplitude reflects displacement magnitude and whose phase indicates displacement direction.',
    purposeAndApplications: [
      'Calibrating precision linear displacement sensors over ±10 mm range with 0.01 mm resolution.',
      'Studying the null voltage phenomenon and phase sensitivity.',
      'Measuring mechanical strain, actuator stroke position, and dimensional tolerances.',
      'Understanding signal conditioning (AC carrier excitation, synchronous phase-sensitive demodulation, and low-pass filtering).'
    ],
    howItWorks: 'The primary coil is excited with a 2 kHz to 5 kHz AC carrier (~3V RMS). When the ferromagnetic core is perfectly centered at the "Null Position", equal magnetic flux links both secondary coils S1 and S2. Because they are wired in series opposition (Vo = Vs1 - Vs2), the net differential output is ideally zero. When the micrometer moves the core toward S1, Vs1 increases and Vs2 decreases, producing an in-phase output. Moving toward S2 produces a 180° out-of-phase output.',
    whereItIsUsed: [
      'Sensors & Transducers Laboratory',
      'Mechatronics & Robotics Wing (Hydraulic cylinder position feedback)',
      'Automotive suspension travel analysis test rigs'
    ],
    operatingProcedure: [
      {
        step: 1,
        title: 'Initial Zero / Null Balancing',
        instruction: 'Turn on the trainer console. Rotate the precision micrometer spindle until the mechanical index reads 10.00 mm (the mechanical center).',
        tip: 'Adjust the "Zero Balance" potentiometer until the digital voltmeter display reads 0.00 V.'
      },
      {
        step: 2,
        title: 'Positive Displacement Step Measurements',
        instruction: 'Rotate micrometer clockwise in steps of 1.00 mm from 10.00 mm up to 20.00 mm (+10 mm range). Record displacement (x) and output voltage (Vo) in the laboratory journal.'
      },
      {
        step: 3,
        title: 'Negative Displacement Step Measurements',
        instruction: 'Rotate micrometer counter-clockwise through the null point down to 0.00 mm (-10 mm range). Observe the phase indicator LED changes color (e.g. Green for +phase, Red for -phase).'
      },
      {
        step: 4,
        title: 'Sensitivity Calculation & Plotting',
        instruction: 'Plot Output Voltage (V) vs Displacement (mm). Calculate sensitivity S = ΔV / Δx in mV/mm from the linear slope.'
      }
    ],
    pinoutAndConnections: {
      diagramType: 'terminal_panel',
      packageType: 'Color-Coded Binding Terminals',
      pins: [
        { number: 'P1-P2', name: 'Primary Coil Terminals', type: 'input', voltageLevel: '3.0V RMS @ 2.5 kHz AC', description: 'Excitation carrier input from internal oscillator.', hotspotCoordinates: { x: 50, y: 45 } },
        { number: 'S1-S2', name: 'Differential Output Terminals', type: 'output', voltageLevel: '0 to 2.5V AC', description: 'Series-opposed secondary output.', hotspotCoordinates: { x: 75, y: 45 } },
        { number: 'GND', name: 'Chassis Shield Ground', type: 'ground', voltageLevel: '0V', description: 'Connects to outer mu-metal magnetic shield to reduce 50Hz mains hum.', hotspotCoordinates: { x: 90, y: 80 } }
      ],
      wiringRules: [
        'Never apply DC voltage to LVDT primary coils (causes saturation and excessive coil heating).',
        'Avoid placing ferromagnetic tools (wrenches, steel calipers) near the sensor barrel during testing.'
      ]
    },
    technicalSpecs: [
      { property: 'Measurement Range', value: '±10', unit: 'mm (Total 20 mm stroke)' },
      { property: 'Primary Excitation Frequency', value: '2.5', unit: 'kHz' },
      { property: 'Excitation Voltage', value: '3.0', unit: 'V RMS' },
      { property: 'Linearity Error', value: '±0.25%', unit: 'of Full Scale' },
      { property: 'Sensitivity', value: '120', unit: 'mV / mm / V' },
      { property: 'Residual Null Voltage', value: '< 15', unit: 'mV RMS' }
    ],
    safetyPrecautions: [
      {
        severity: 'warning',
        text: 'Do not overtighten the micrometer thimble past the mechanical stop.',
        rationale: 'Forcing the micrometer binds the non-magnetic core shaft and bends the suspension guide springs.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming null voltage will be mathematically 0.000 mV.',
        consequence: 'Student wastes an hour trying to eliminate residual null millivolts.',
        fix: 'Real LVDTs exhibit small residual null voltages due to slight harmonic distortion and capacitive coupling between windings.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Digital voltmeter shows random erratic numbers when micrometer is touched.',
        probableCause: 'Core rod is rubbing against internal coil bobbin due to misaligned clamp.',
        remedy: 'Loosen clamp collar and ensure core floats freely along the central cylindrical axis.'
      }
    ],
    relatedComponents: [
      {
        id: 'eq-dso-tek',
        name: 'Tektronix TBS1052B Oscilloscope',
        relationType: 'pairs_with',
        note: 'Used to observe the 180° phase flip on CH 2 as the core passes through the null center.'
      }
    ],
    labManualReference: {
      manualTitle: 'AIT Mechanical Engineering: Mechatronics & Instrumentation (ME304)',
      experimentNumber: 'Exp 03',
      experimentName: 'Calibration of Linear Variable Differential Transformer (LVDT) for Displacement Measurement',
      courseCode: 'ME304',
      pageReference: 'Pages 18-24'
    }
  }
];
