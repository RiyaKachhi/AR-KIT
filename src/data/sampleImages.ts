// High fidelity SVG visualizations and photo representations for lab equipment
export const EQUIPMENT_IMAGES = {
  dso: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2D333F"/>
          <stop offset="30%" stop-color="#1E232E"/>
          <stop offset="100%" stop-color="#141820"/>
        </linearGradient>
        <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#151922"/>
          <stop offset="100%" stop-color="#0B0D13"/>
        </linearGradient>
        <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#002D33"/>
          <stop offset="100%" stop-color="#001217"/>
        </radialGradient>
        <linearGradient id="knobMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#64748B"/>
          <stop offset="50%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#1E293B"/>
        </linearGradient>
      </defs>

      <!-- Chassis Body -->
      <rect x="50" y="50" width="800" height="500" rx="18" fill="url(#bodyGrad)" stroke="#3E4756" stroke-width="3"/>
      <!-- Soft drop shadow line -->
      <rect x="60" y="530" width="780" height="15" rx="6" fill="#0A0C10" opacity="0.6"/>
      <!-- Top Handle -->
      <path d="M 280 50 L 320 20 L 580 20 L 620 50 Z" fill="#252A34" stroke="#4B5563" stroke-width="2"/>
      
      <!-- Brand & Model Header -->
      <text x="90" y="95" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="22" fill="#E2E8F0" letter-spacing="1.5">Tektronix</text>
      <text x="215" y="95" font-family="JetBrains Mono, monospace" font-size="14" fill="#94A3B8">TBS1052B-EDU</text>
      <rect x="330" y="80" width="90" height="20" rx="3" fill="#00F0FF" fill-opacity="0.15" stroke="#00F0FF" stroke-width="1"/>
      <text x="340" y="94" font-family="JetBrains Mono, monospace" font-size="11" fill="#00F0FF">50MHz 1GS/s</text>

      <!-- Power Button -->
      <circle cx="800" cy="90" r="14" fill="#1E293B" stroke="#00F0FF" stroke-width="1.5"/>
      <path d="M 800 82 V 89 M 795 85 A 6 6 0 1 0 805 85" fill="none" stroke="#00F0FF" stroke-width="1.8" stroke-linecap="round"/>

      <!-- LCD Display Screen Bezel -->
      <rect x="85" y="125" width="450" height="340" rx="10" fill="url(#bezelGrad)" stroke="#222938" stroke-width="4"/>
      <!-- Inner Active Screen Area -->
      <rect x="100" y="140" width="420" height="310" rx="6" fill="url(#screenGlow)" stroke="#004D5A" stroke-width="1.5"/>
      
      <!-- Screen Graticule / 8x10 Grid -->
      <g stroke="#006677" stroke-width="0.75" opacity="0.5">
        <line x1="100" y1="178.75" x2="520" y2="178.75"/>
        <line x1="100" y1="217.5" x2="520" y2="217.5"/>
        <line x1="100" y1="256.25" x2="520" y2="256.25"/>
        <line x1="100" y1="295" x2="520" y2="295" stroke="#00A3BF" stroke-width="1.2"/>
        <line x1="100" y1="333.75" x2="520" y2="333.75"/>
        <line x1="100" y1="372.5" x2="520" y2="372.5"/>
        <line x1="100" y1="411.25" x2="520" y2="411.25"/>

        <line x1="142" y1="140" x2="142" y2="450"/>
        <line x1="184" y1="140" x2="184" y2="450"/>
        <line x1="226" y1="140" x2="226" y2="450"/>
        <line x1="268" y1="140" x2="268" y2="450"/>
        <line x1="310" y1="140" x2="310" y2="450" stroke="#00A3BF" stroke-width="1.2"/>
        <line x1="352" y1="140" x2="352" y2="450"/>
        <line x1="394" y1="140" x2="394" y2="450"/>
        <line x1="436" y1="140" x2="436" y2="450"/>
        <line x1="478" y1="140" x2="478" y2="450"/>
      </g>

      <!-- Sine Wave Signal CH1 (Yellow) -->
      <path d="M 100 295 C 130 180, 160 180, 190 295 C 220 410, 250 410, 280 295 C 310 180, 340 180, 370 295 C 400 410, 430 410, 460 295 C 490 180, 510 200, 520 295" 
            fill="none" stroke="#FACC15" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Square Wave Signal CH2 (Cyan) -->
      <path d="M 100 370 H 160 V 220 H 220 V 370 H 280 V 220 H 340 V 370 H 400 V 220 H 460 V 370 H 520" 
            fill="none" stroke="#00F0FF" stroke-width="2.5" stroke-dasharray="0" opacity="0.85"/>

      <!-- Screen Telemetry Readout -->
      <text x="110" y="160" font-family="JetBrains Mono" font-size="11" fill="#FACC15" font-weight="600">CH1: 1.00V ~ 1.000kHz</text>
      <text x="260" y="160" font-family="JetBrains Mono" font-size="11" fill="#00F0FF" font-weight="600">CH2: 2.00V</text>
      <text x="390" y="160" font-family="JetBrains Mono" font-size="11" fill="#38BDF8">M: 250µs</text>
      <rect x="460" y="148" width="50" height="16" rx="2" fill="#15803D"/>
      <text x="468" y="160" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" font-weight="700">TRIG'D</text>

      <text x="110" y="440" font-family="JetBrains Mono" font-size="10" fill="#CBD5E1">Vpp: 2.84V | Freq: 1.000kHz | Vmax: 1.42V</text>

      <!-- Soft Bezel Function Keys F1-F5 -->
      <g fill="#1E2533" stroke="#334155" stroke-width="1">
        <rect x="542" y="150" width="22" height="34" rx="4"/>
        <rect x="542" y="210" width="22" height="34" rx="4"/>
        <rect x="542" y="270" width="22" height="34" rx="4"/>
        <rect x="542" y="330" width="22" height="34" rx="4"/>
        <rect x="542" y="390" width="22" height="34" rx="4"/>
      </g>

      <!-- RIGHT CONTROL PANEL -->
      <!-- Horizontal / Scale Knob -->
      <circle cx="630" cy="180" r="28" fill="url(#knobMetallic)" stroke="#475569" stroke-width="2"/>
      <circle cx="630" cy="180" r="18" fill="#1E232E"/>
      <rect x="628" y="154" width="4" height="12" fill="#00F0FF" rx="2"/>
      <text x="630" y="222" font-family="Space Grotesk" font-size="10" fill="#94A3B8" text-anchor="middle" font-weight="600">SEC/DIV</text>

      <!-- Vertical Knobs CH1 and CH2 -->
      <!-- CH1 Knob -->
      <circle cx="730" cy="180" r="26" fill="url(#knobMetallic)" stroke="#FACC15" stroke-width="2"/>
      <circle cx="730" cy="180" r="16" fill="#1E232E"/>
      <rect x="728" y="156" width="4" height="10" fill="#FACC15" rx="2"/>
      <text x="730" y="220" font-family="Space Grotesk" font-size="10" fill="#FACC15" text-anchor="middle" font-weight="700">VOLTS/DIV 1</text>

      <!-- Trigger Level Knob -->
      <circle cx="805" cy="270" r="20" fill="url(#knobMetallic)" stroke="#38BDF8" stroke-width="1.5"/>
      <rect x="803" y="252" width="4" height="8" fill="#38BDF8" rx="2"/>
      <text x="805" y="302" font-family="Space Grotesk" font-size="9" fill="#94A3B8" text-anchor="middle">TRIGGER</text>

      <!-- Primary Action Buttons (Autoset, Run/Stop, Single) -->
      <g>
        <rect x="590" y="260" width="70" height="26" rx="4" fill="#0284C7" stroke="#38BDF8" stroke-width="1"/>
        <text x="625" y="277" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle" font-weight="700">AUTOSET</text>

        <rect x="675" y="260" width="70" height="26" rx="4" fill="#16A34A" stroke="#4ADE80" stroke-width="1"/>
        <text x="710" y="277" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle" font-weight="700">RUN/STOP</text>
      </g>

      <!-- Bottom BNC Connectors & Terminals -->
      <g transform="translate(0, 480)">
        <!-- CH 1 BNC -->
        <circle cx="590" cy="0" r="18" fill="#0B0D13" stroke="#FACC15" stroke-width="3"/>
        <circle cx="590" cy="0" r="10" fill="#1E232E" stroke="#64748B" stroke-width="1.5"/>
        <circle cx="590" cy="0" r="3" fill="#FACC15"/>
        <text x="590" y="28" font-family="JetBrains Mono" font-size="11" fill="#FACC15" text-anchor="middle" font-weight="700">CH 1</text>
        <text x="590" y="40" font-family="JetBrains Mono" font-size="8" fill="#64748B" text-anchor="middle">1MΩ 20pF</text>

        <!-- CH 2 BNC -->
        <circle cx="680" cy="0" r="18" fill="#0B0D13" stroke="#00F0FF" stroke-width="3"/>
        <circle cx="680" cy="0" r="10" fill="#1E232E" stroke="#64748B" stroke-width="1.5"/>
        <circle cx="680" cy="0" r="3" fill="#00F0FF"/>
        <text x="680" y="28" font-family="JetBrains Mono" font-size="11" fill="#00F0FF" text-anchor="middle" font-weight="700">CH 2</text>
        <text x="680" y="40" font-family="JetBrains Mono" font-size="8" fill="#64748B" text-anchor="middle">1MΩ 20pF</text>

        <!-- EXT TRIG BNC -->
        <circle cx="770" cy="0" r="16" fill="#0B0D13" stroke="#64748B" stroke-width="2"/>
        <circle cx="770" cy="0" r="8" fill="#1E232E"/>
        <circle cx="770" cy="0" r="2.5" fill="#94A3B8"/>
        <text x="770" y="28" font-family="JetBrains Mono" font-size="10" fill="#94A3B8" text-anchor="middle">EXT TRIG</text>

        <!-- Probe Comp Terminal -->
        <rect x="825" y="-12" width="16" height="24" rx="2" fill="#0B0D13" stroke="#CCFF00" stroke-width="1.5"/>
        <circle cx="833" cy="0" r="3" fill="#CCFF00"/>
        <text x="833" y="26" font-family="JetBrains Mono" font-size="8" fill="#CCFF00" text-anchor="middle">PROBE COMP</text>
        <text x="833" y="36" font-family="JetBrains Mono" font-size="7" fill="#64748B" text-anchor="middle">5V 1kHz</text>
      </g>
    </svg>
  `)}`,

  functionGenerator: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
      <defs>
        <linearGradient id="fgBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#282D37"/>
          <stop offset="100%" stop-color="#14171E"/>
        </linearGradient>
      </defs>
      <rect x="50" y="70" width="800" height="460" rx="14" fill="url(#fgBody)" stroke="#374151" stroke-width="3"/>
      
      <!-- Brand -->
      <text x="90" y="115" font-family="Space Grotesk" font-weight="700" font-size="20" fill="#E2E8F0">Keysight</text>
      <text x="190" y="115" font-family="JetBrains Mono" font-size="14" fill="#94A3B8">33220A 20MHz Function Generator</text>
      <circle cx="790" cy="110" r="14" fill="#1F2937" stroke="#10B981" stroke-width="2"/>

      <!-- LCD Display Screen -->
      <rect x="85" y="145" width="460" height="280" rx="8" fill="#052E16" stroke="#166534" stroke-width="2"/>
      
      <!-- Display readout -->
      <text x="110" y="190" font-family="JetBrains Mono" font-size="28" fill="#4ADE80" font-weight="700">10.000,000 kHz</text>
      <text x="110" y="235" font-family="JetBrains Mono" font-size="20" fill="#22C55E">Ampl: 2.000 Vpp  |  Offset: 0.000 Vdc</text>
      <text x="110" y="275" font-family="JetBrains Mono" font-size="16" fill="#86EFAC">Waveform: SINE (50.0% Duty)</text>
      <text x="110" y="315" font-family="JetBrains Mono" font-size="14" fill="#BBF7D0">Load: 50 Ω  |  Phase: 0.0°</text>

      <!-- Sine graphic in display -->
      <path d="M 110 380 Q 150 330 190 380 T 270 380 T 350 380 T 430 380" fill="none" stroke="#4ADE80" stroke-width="3"/>

      <!-- Waveform Select Buttons -->
      <g transform="translate(580, 150)">
        <rect x="0" y="0" width="75" height="34" rx="4" fill="#1E293B" stroke="#00F0FF" stroke-width="1.5"/>
        <text x="37" y="22" font-family="JetBrains Mono" font-size="11" fill="#00F0FF" text-anchor="middle">SINE</text>

        <rect x="90" y="0" width="75" height="34" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1"/>
        <text x="127" y="22" font-family="JetBrains Mono" font-size="11" fill="#94A3B8" text-anchor="middle">SQUARE</text>

        <rect x="180" y="0" width="75" height="34" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1"/>
        <text x="217" y="22" font-family="JetBrains Mono" font-size="11" fill="#94A3B8" text-anchor="middle">RAMP</text>

        <rect x="0" y="50" width="75" height="34" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1"/>
        <text x="37" y="72" font-family="JetBrains Mono" font-size="11" fill="#94A3B8" text-anchor="middle">PULSE</text>

        <rect x="90" y="50" width="75" height="34" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1"/>
        <text x="127" y="72" font-family="JetBrains Mono" font-size="11" fill="#94A3B8" text-anchor="middle">NOISE</text>

        <rect x="180" y="50" width="75" height="34" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1"/>
        <text x="217" y="72" font-family="JetBrains Mono" font-size="11" fill="#94A3B8" text-anchor="middle">ARB</text>
      </g>

      <!-- Numerical Rotary Knob -->
      <circle cx="710" cy="320" r="45" fill="#334155" stroke="#64748B" stroke-width="3"/>
      <circle cx="710" cy="320" r="28" fill="#0F172A"/>
      <circle cx="730" cy="300" r="6" fill="#94A3B8"/>
      <text x="710" y="385" font-family="Space Grotesk" font-size="11" fill="#94A3B8" text-anchor="middle">PARAM ADJUST</text>

      <!-- Output BNC Sections -->
      <g transform="translate(0, 460)">
        <circle cx="710" cy="20" r="20" fill="#0B0D13" stroke="#F59E0B" stroke-width="3"/>
        <circle cx="710" cy="20" r="10" fill="#1E293B"/>
        <circle cx="710" cy="20" r="3" fill="#F59E0B"/>
        <text x="710" y="55" font-family="JetBrains Mono" font-size="12" fill="#F59E0B" text-anchor="middle" font-weight="700">OUTPUT (50Ω)</text>

        <circle cx="810" cy="20" r="16" fill="#0B0D13" stroke="#64748B" stroke-width="2"/>
        <circle cx="810" cy="20" r="8" fill="#1E293B"/>
        <circle cx="810" cy="20" r="2.5" fill="#94A3B8"/>
        <text x="810" y="52" font-family="JetBrains Mono" font-size="10" fill="#94A3B8" text-anchor="middle">SYNC / TRIG</text>
      </g>
    </svg>
  `)}`,

  powerSupply: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
      <rect x="50" y="60" width="800" height="480" rx="14" fill="#1B1F27" stroke="#374151" stroke-width="3"/>
      <text x="90" y="110" font-family="Space Grotesk" font-weight="700" font-size="22" fill="#E2E8F0">Scientific</text>
      <text x="200" y="110" font-family="JetBrains Mono" font-size="14" fill="#94A3B8">PSD3304 Dual Tracking Regulated DC Power Supply</text>

      <!-- Dual 7-segment LED meters -->
      <!-- Left Master Meter -->
      <rect x="90" y="140" width="310" height="150" rx="8" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
      <text x="110" y="180" font-family="JetBrains Mono" font-size="14" fill="#94A3B8">CH 1 (MASTER)</text>
      <text x="110" y="235" font-family="JetBrains Mono" font-size="44" fill="#EF4444" font-weight="700">12.0</text>
      <text x="220" y="235" font-family="JetBrains Mono" font-size="24" fill="#EF4444">V</text>
      <text x="260" y="235" font-family="JetBrains Mono" font-size="44" fill="#22C55E" font-weight="700">0.50</text>
      <text x="370" y="235" font-family="JetBrains Mono" font-size="24" fill="#22C55E">A</text>

      <!-- Right Slave Meter -->
      <rect x="500" y="140" width="310" height="150" rx="8" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
      <text x="520" y="180" font-family="JetBrains Mono" font-size="14" fill="#94A3B8">CH 2 (SLAVE)</text>
      <text x="520" y="235" font-family="JetBrains Mono" font-size="44" fill="#EF4444" font-weight="700">12.0</text>
      <text x="630" y="235" font-family="JetBrains Mono" font-size="24" fill="#EF4444">V</text>
      <text x="670" y="235" font-family="JetBrains Mono" font-size="44" fill="#22C55E" font-weight="700">0.00</text>
      <text x="780" y="235" font-family="JetBrains Mono" font-size="24" fill="#22C55E">A</text>

      <!-- Tracking Mode Selector Buttons -->
      <rect x="360" y="320" width="180" height="40" rx="6" fill="#111827" stroke="#475569" stroke-width="1.5"/>
      <text x="450" y="345" font-family="JetBrains Mono" font-size="11" fill="#38BDF8" text-anchor="middle">MODE: SERIES TRACKING</text>

      <!-- Terminals CH1 -->
      <g transform="translate(130, 420)">
        <!-- Red + -->
        <circle cx="40" cy="30" r="16" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
        <circle cx="40" cy="30" r="6" fill="#000000"/>
        <text x="40" y="65" font-family="JetBrains Mono" font-size="14" fill="#EF4444" text-anchor="middle" font-weight="700">+</text>

        <!-- Black - -->
        <circle cx="110" cy="30" r="16" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>
        <circle cx="110" cy="30" r="6" fill="#000000"/>
        <text x="110" y="65" font-family="JetBrains Mono" font-size="14" fill="#94A3B8" text-anchor="middle" font-weight="700">-</text>

        <!-- Green GND -->
        <circle cx="180" cy="30" r="16" fill="#15803D" stroke="#166534" stroke-width="2"/>
        <circle cx="180" cy="30" r="6" fill="#000000"/>
        <text x="180" y="65" font-family="JetBrains Mono" font-size="12" fill="#22C55E" text-anchor="middle" font-weight="700">GND</text>
        <text x="110" y="85" font-family="Space Grotesk" font-size="12" fill="#CBD5E1" text-anchor="middle">0 - 30V / 3A (CH1)</text>
      </g>

      <!-- Terminals CH2 -->
      <g transform="translate(540, 420)">
        <!-- Red + -->
        <circle cx="40" cy="30" r="16" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
        <circle cx="40" cy="30" r="6" fill="#000000"/>
        <text x="40" y="65" font-family="JetBrains Mono" font-size="14" fill="#EF4444" text-anchor="middle" font-weight="700">+</text>

        <!-- Black - -->
        <circle cx="110" cy="30" r="16" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>
        <circle cx="110" cy="30" r="6" fill="#000000"/>
        <text x="110" y="65" font-family="JetBrains Mono" font-size="14" fill="#94A3B8" text-anchor="middle" font-weight="700">-</text>

        <!-- Green GND -->
        <circle cx="180" cy="30" r="16" fill="#15803D" stroke="#166534" stroke-width="2"/>
        <circle cx="180" cy="30" r="6" fill="#000000"/>
        <text x="180" y="65" font-family="JetBrains Mono" font-size="12" fill="#22C55E" text-anchor="middle" font-weight="700">GND</text>
        <text x="110" y="85" font-family="Space Grotesk" font-size="12" fill="#CBD5E1" text-anchor="middle">0 - 30V / 3A (CH2)</text>
      </g>
    </svg>
  `)}`,

  multimeter: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
      <rect x="250" y="40" width="400" height="520" rx="36" fill="#EAB308" stroke="#CA8A04" stroke-width="6"/>
      <!-- Inner Dark Casing -->
      <rect x="270" y="60" width="360" height="480" rx="24" fill="#18181B" stroke="#27272A" stroke-width="2"/>

      <!-- Brand -->
      <text x="450" y="95" font-family="Space Grotesk" font-weight="800" font-size="20" fill="#F8FAFC" text-anchor="middle">FLUKE 115</text>
      <text x="450" y="112" font-family="JetBrains Mono" font-size="11" fill="#94A3B8" text-anchor="middle">TRUE RMS MULTIMETER</text>

      <!-- Digital LCD Backlit Screen -->
      <rect x="300" y="125" width="300" height="110" rx="8" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
      <text x="320" y="150" font-family="JetBrains Mono" font-size="12" fill="#475569">AUTO</text>
      <text x="560" y="150" font-family="JetBrains Mono" font-size="12" fill="#475569">AC</text>
      <text x="450" y="200" font-family="JetBrains Mono" font-size="46" fill="#0F172A" font-weight="700" text-anchor="middle">230.4</text>
      <text x="570" y="200" font-family="JetBrains Mono" font-size="22" fill="#0F172A" font-weight="600">V~</text>
      <!-- Analog Bargraph -->
      <rect x="320" y="215" width="260" height="6" fill="#CBD5E1"/>
      <rect x="320" y="215" width="190" height="6" fill="#0F172A"/>

      <!-- Large Rotary Function Switch -->
      <g transform="translate(450, 320)">
        <circle cx="0" cy="0" r="65" fill="#27272A" stroke="#52525B" stroke-width="4"/>
        <circle cx="0" cy="0" r="45" fill="#3F3F46"/>
        <line x1="0" y1="-45" x2="0" y2="-20" stroke="#EAB308" stroke-width="6" stroke-linecap="round"/>
        <!-- Dial Positions -->
        <text x="0" y="-75" font-family="JetBrains Mono" font-size="13" fill="#EAB308" text-anchor="middle" font-weight="700">VAC ~</text>
        <text x="75" y="-30" font-family="JetBrains Mono" font-size="12" fill="#F8FAFC" text-anchor="start">VDC ⎓</text>
        <text x="75" y="35" font-family="JetBrains Mono" font-size="12" fill="#F8FAFC" text-anchor="start">Ω / Diode</text>
        <text x="0" y="90" font-family="JetBrains Mono" font-size="13" fill="#EF4444" text-anchor="middle" font-weight="700">A ~ ⎓</text>
        <text x="-75" y="0" font-family="JetBrains Mono" font-size="12" fill="#94A3B8" text-anchor="end">OFF</text>
      </g>

      <!-- Jack Ports -->
      <g transform="translate(450, 470)">
        <!-- 10A Jack -->
        <circle cx="-100" cy="0" r="16" fill="#EF4444" stroke="#7F1D1D" stroke-width="3"/>
        <circle cx="-100" cy="0" r="6" fill="#000000"/>
        <text x="-100" y="30" font-family="JetBrains Mono" font-size="10" fill="#EF4444" text-anchor="middle" font-weight="700">10A MAX</text>

        <!-- COM Jack -->
        <circle cx="0" cy="0" r="16" fill="#000000" stroke="#52525B" stroke-width="3"/>
        <circle cx="0" cy="0" r="6" fill="#27272A"/>
        <text x="0" y="30" font-family="JetBrains Mono" font-size="10" fill="#CBD5E1" text-anchor="middle" font-weight="700">COM</text>

        <!-- V / Ω / Capacitance Jack -->
        <circle cx="100" cy="0" r="16" fill="#DC2626" stroke="#7F1D1D" stroke-width="3"/>
        <circle cx="100" cy="0" r="6" fill="#000000"/>
        <text x="100" y="30" font-family="JetBrains Mono" font-size="10" fill="#EF4444" text-anchor="middle" font-weight="700">V - Ω - ⭢|</text>
      </g>
    </svg>
  `)}`,

  ne555: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
      <!-- IC DIP-8 Body -->
      <defs>
        <linearGradient id="icEpoxy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2D3139"/>
          <stop offset="10%" stop-color="#1F232B"/>
          <stop offset="90%" stop-color="#14171D"/>
          <stop offset="100%" stop-color="#0E1014"/>
        </linearGradient>
        <linearGradient id="pinSilver" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#CBD5E1"/>
          <stop offset="50%" stop-color="#94A3B8"/>
          <stop offset="100%" stop-color="#64748B"/>
        </linearGradient>
      </defs>

      <!-- Left 4 Pins (1 to 4) -->
      <g fill="url(#pinSilver)" stroke="#475569" stroke-width="1.5">
        <rect x="180" y="140" width="110" height="24" rx="3"/>
        <rect x="180" y="220" width="110" height="24" rx="3"/>
        <rect x="180" y="300" width="110" height="24" rx="3"/>
        <rect x="180" y="380" width="110" height="24" rx="3"/>
      </g>

      <!-- Right 4 Pins (8 to 5) -->
      <g fill="url(#pinSilver)" stroke="#475569" stroke-width="1.5">
        <rect x="610" y="140" width="110" height="24" rx="3"/>
        <rect x="610" y="220" width="110" height="24" rx="3"/>
        <rect x="610" y="300" width="110" height="24" rx="3"/>
        <rect x="610" y="380" width="110" height="24" rx="3"/>
      </g>

      <!-- Main Black Molded Epoxy Package -->
      <rect x="270" y="100" width="360" height="360" rx="12" fill="url(#icEpoxy)" stroke="#374151" stroke-width="3"/>
      
      <!-- Orientation Notch (Top Middle) -->
      <path d="M 425 100 A 25 25 0 0 0 475 100 Z" fill="#0B0D13" stroke="#374151" stroke-width="2"/>
      
      <!-- Pin 1 Dot Marker -->
      <circle cx="310" cy="140" r="10" fill="#111827" stroke="#4B5563" stroke-width="1.5"/>

      <!-- Laser Etched IC Markings -->
      <text x="450" y="240" font-family="Space Grotesk" font-weight="700" font-size="34" fill="#94A3B8" text-anchor="middle" letter-spacing="4">NE555P</text>
      <text x="450" y="280" font-family="JetBrains Mono" font-size="16" fill="#64748B" text-anchor="middle">TI 24CH38K</text>
      <text x="450" y="320" font-family="JetBrains Mono" font-size="12" fill="#475569" text-anchor="middle">PRECISION TIMER IC</text>

      <!-- Pin Labels Overlays for clear understanding -->
      <!-- Left Side -->
      <g font-family="JetBrains Mono" font-size="13" font-weight="600">
        <text x="160" y="157" fill="#10B981" text-anchor="end">1: GND</text>
        <text x="160" y="237" fill="#00F0FF" text-anchor="end">2: TRIG</text>
        <text x="160" y="317" fill="#FACC15" text-anchor="end">3: OUT</text>
        <text x="160" y="397" fill="#EF4444" text-anchor="end">4: RESET</text>
      </g>
      <!-- Right Side -->
      <g font-family="JetBrains Mono" font-size="13" font-weight="600">
        <text x="740" y="157" fill="#EF4444" text-anchor="start">8: VCC</text>
        <text x="740" y="237" fill="#CCFF00" text-anchor="start">7: DISCH</text>
        <text x="740" y="317" fill="#38BDF8" text-anchor="start">6: THRES</text>
        <text x="740" y="397" fill="#A855F7" text-anchor="start">5: CONT</text>
      </g>
    </svg>
  `)}`,

  esp32: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
      <!-- Black Matte PCB -->
      <rect x="240" y="50" width="420" height="500" rx="14" fill="#0B131B" stroke="#00F0FF" stroke-width="2"/>
      <!-- Gold Header Pads -->
      <g fill="#F59E0B">
        <!-- Left 15 pins -->
        ${Array.from({length: 15}).map((_, i) => `<circle cx="260" cy="${80 + i * 30}" r="6" stroke="#78350F" stroke-width="1"/>`).join('')}
        <!-- Right 15 pins -->
        ${Array.from({length: 15}).map((_, i) => `<circle cx="640" cy="${80 + i * 30}" r="6" stroke="#78350F" stroke-width="1"/>`).join('')}
      </g>
      <!-- Metal RF Shield (ESP-WROOM-32) -->
      <rect x="320" y="90" width="260" height="220" rx="8" fill="#CBD5E1" stroke="#94A3B8" stroke-width="2"/>
      <path d="M 330 110 H 570 M 330 130 H 570" stroke="#94A3B8" stroke-width="1"/>
      <text x="450" y="170" font-family="Space Grotesk" font-weight="700" font-size="24" fill="#1E293B" text-anchor="middle">ESP-WROOM-32</text>
      <text x="450" y="200" font-family="JetBrains Mono" font-size="13" fill="#475569" text-anchor="middle">Wi-Fi + BLE MCU</text>
      <text x="450" y="225" font-family="JetBrains Mono" font-size="11" fill="#64748B" text-anchor="middle">FCC ID: 2AC7Z-ESPWROOM32</text>

      <!-- PCB Meandered Trace Antenna -->
      <rect x="360" y="55" width="180" height="28" fill="#1E293B" rx="3"/>
      <path d="M 370 70 H 390 V 60 H 410 V 70 H 430 V 60 H 450 V 70 H 470 V 60 H 490 V 70 H 510 V 60 H 530" fill="none" stroke="#F59E0B" stroke-width="2"/>

      <!-- Micro USB Port -->
      <rect x="410" y="525" width="80" height="30" rx="4" fill="#94A3B8" stroke="#64748B" stroke-width="2"/>
      <rect x="425" y="535" width="50" height="15" rx="2" fill="#1E293B"/>

      <!-- EN and BOOT Buttons -->
      <rect x="300" y="470" width="30" height="30" rx="4" fill="#334155" stroke="#64748B" stroke-width="1"/>
      <circle cx="315" cy="485" r="8" fill="#94A3B8"/>
      <text x="315" y="515" font-family="JetBrains Mono" font-size="10" fill="#94A3B8" text-anchor="middle">EN</text>

      <rect x="570" y="470" width="30" height="30" rx="4" fill="#334155" stroke="#64748B" stroke-width="1"/>
      <circle cx="585" cy="485" r="8" fill="#94A3B8"/>
      <text x="585" y="515" font-family="JetBrains Mono" font-size="10" fill="#94A3B8" text-anchor="middle">BOOT</text>

      <!-- CP2102 USB-to-UART Bridge IC -->
      <rect x="420" y="440" width="60" height="60" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
      <text x="450" y="475" font-family="JetBrains Mono" font-size="10" fill="#94A3B8" text-anchor="middle">CP2102</text>
    </svg>
  `)}`,

  lvdt: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
      <rect x="60" y="60" width="780" height="480" rx="14" fill="#161B22" stroke="#30363D" stroke-width="3"/>
      <text x="100" y="110" font-family="Space Grotesk" font-weight="700" font-size="22" fill="#E2E8F0">AIT Mechatronics Lab</text>
      <text x="330" y="110" font-family="JetBrains Mono" font-size="14" fill="#94A3B8">LVDT Displacement Transducer Calibration Bench</text>

      <!-- Core Cylinder & Micrometer -->
      <!-- Micrometer Head -->
      <rect x="100" y="240" width="140" height="60" rx="6" fill="#334155" stroke="#64748B" stroke-width="2"/>
      <rect x="140" y="220" width="50" height="100" rx="4" fill="#475569"/>
      <text x="165" y="275" font-family="JetBrains Mono" font-size="12" fill="#CBD5E1" text-anchor="middle">±10mm</text>

      <!-- Connecting Shaft / Core -->
      <rect x="240" y="260" width="160" height="20" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
      <rect x="400" y="255" width="80" height="30" rx="3" fill="#1E293B" stroke="#00F0FF" stroke-width="2"/>
      <text x="440" y="275" font-family="JetBrains Mono" font-size="10" fill="#00F0FF" text-anchor="middle">CORE</text>

      <!-- Transducer Coil Assembly -->
      <rect x="360" y="180" width="260" height="180" rx="8" fill="#0B131E" stroke="#38BDF8" stroke-width="2"/>
      <!-- Primary Coil in Middle -->
      <rect x="460" y="200" width="60" height="140" rx="4" fill="#B45309" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="490" y="275" font-family="JetBrains Mono" font-size="11" fill="#FEF3C7" text-anchor="middle">PRI (AC)</text>

      <!-- Secondary 1 (Left) -->
      <rect x="380" y="200" width="55" height="140" rx="4" fill="#047857" stroke="#10B981" stroke-width="1.5"/>
      <text x="407" y="275" font-family="JetBrains Mono" font-size="11" fill="#ECFDF5" text-anchor="middle">SEC 1</text>

      <!-- Secondary 2 (Right) -->
      <rect x="545" y="200" width="55" height="140" rx="4" fill="#047857" stroke="#10B981" stroke-width="1.5"/>
      <text x="572" y="275" font-family="JetBrains Mono" font-size="11" fill="#ECFDF5" text-anchor="middle">SEC 2</text>

      <!-- Digital Readout Display -->
      <rect x="650" y="180" width="160" height="100" rx="6" fill="#022C22" stroke="#059669" stroke-width="2"/>
      <text x="730" y="210" font-family="JetBrains Mono" font-size="11" fill="#6EE7B7" text-anchor="middle">DISPLACEMENT</text>
      <text x="730" y="250" font-family="JetBrains Mono" font-size="28" fill="#10B981" font-weight="700" text-anchor="middle">+3.42</text>
      <text x="730" y="270" font-family="JetBrains Mono" font-size="12" fill="#6EE7B7" text-anchor="middle">mm</text>

      <!-- Differential Output Graph -->
      <g transform="translate(100, 390)">
        <rect x="0" y="0" width="700" height="110" rx="6" fill="#0D1117" stroke="#21262D" stroke-width="1"/>
        <line x1="40" y1="55" x2="660" y2="55" stroke="#484F58" stroke-width="1"/>
        <line x1="350" y1="10" x2="350" y2="100" stroke="#484F58" stroke-width="1"/>
        <path d="M 60 90 L 350 55 L 640 20" stroke="#CCFF00" stroke-width="2.5" fill="none"/>
        <circle cx="350" cy="55" r="4" fill="#00F0FF"/>
        <text x="350" y="70" font-family="JetBrains Mono" font-size="10" fill="#00F0FF" text-anchor="middle">NULL POSITION (Vo = 0V)</text>
      </g>
    </svg>
  `)}`,

  ic7408: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
      <rect x="220" y="80" width="460" height="440" rx="14" fill="#151922" stroke="#2E384D" stroke-width="3"/>
      <!-- Top Notch -->
      <path d="M 420 80 A 30 30 0 0 0 480 80 Z" fill="#080A0E" stroke="#2E384D" stroke-width="2"/>
      <circle cx="260" cy="120" r="8" fill="#000000" stroke="#475569" stroke-width="1.5"/>

      <!-- Text marking -->
      <text x="450" y="270" font-family="Space Grotesk" font-weight="700" font-size="36" fill="#CBD5E1" text-anchor="middle" letter-spacing="3">SN74LS08N</text>
      <text x="450" y="315" font-family="JetBrains Mono" font-size="16" fill="#00F0FF" text-anchor="middle">QUAD 2-INPUT POSITIVE-AND GATES</text>
      <text x="450" y="350" font-family="JetBrains Mono" font-size="12" fill="#64748B" text-anchor="middle">LOW-POWER SCHOTTKY TTL</text>

      <!-- 14 Pins -->
      <!-- Left side: Pins 1 to 7 -->
      <g fill="#94A3B8" stroke="#475569" stroke-width="1.5">
        ${Array.from({length: 7}).map((_, i) => `<rect x="120" y="${120 + i * 50}" width="100" height="24" rx="3"/>`).join('')}
      </g>
      <!-- Right side: Pins 14 down to 8 -->
      <g fill="#94A3B8" stroke="#475569" stroke-width="1.5">
        ${Array.from({length: 7}).map((_, i) => `<rect x="680" y="${120 + i * 50}" width="100" height="24" rx="3"/>`).join('')}
      </g>

      <!-- Left pin labels -->
      <g font-family="JetBrains Mono" font-size="12" font-weight="600" fill="#38BDF8">
        <text x="100" y="137" text-anchor="end">1: 1A</text>
        <text x="100" y="187" text-anchor="end">2: 1B</text>
        <text x="100" y="237" text-anchor="end" fill="#FACC15">3: 1Y (OUT)</text>
        <text x="100" y="287" text-anchor="end">4: 2A</text>
        <text x="100" y="337" text-anchor="end">5: 2B</text>
        <text x="100" y="387" text-anchor="end" fill="#FACC15">6: 2Y (OUT)</text>
        <text x="100" y="437" text-anchor="end" fill="#10B981">7: GND (0V)</text>
      </g>
      <!-- Right pin labels -->
      <g font-family="JetBrains Mono" font-size="12" font-weight="600" fill="#38BDF8">
        <text x="800" y="137" text-anchor="start" fill="#EF4444">14: VCC (+5V)</text>
        <text x="800" y="187" text-anchor="start">13: 4B</text>
        <text x="800" y="237" text-anchor="start">12: 4A</text>
        <text x="800" y="287" text-anchor="start" fill="#FACC15">11: 4Y (OUT)</text>
        <text x="800" y="337" text-anchor="start">10: 3B</text>
        <text x="800" y="387" text-anchor="start">9: 3A</text>
        <text x="800" y="437" text-anchor="start" fill="#FACC15">8: 3Y (OUT)</text>
      </g>
    </svg>
  `)}`
};
