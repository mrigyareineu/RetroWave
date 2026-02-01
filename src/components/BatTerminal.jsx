import React, { useMemo } from 'react';
import Terminal from 'react-console-emulator';

const BatTerminal = ({ onClose }) => {
  // Define commands within useMemo to prevent unnecessary re-renders
  const commands = useMemo(() => ({
    // Simple echo command
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args) => args.join(' '),
    },
    // The cute "Who am I" command
    whoami: {
      description: 'Identify user.',
      usage: 'whoami',
      fn: () => 'RESULT: The World\'s Greatest Detective\'s Boyfriend ❤️',
    },
    // Exit closes the window
    exit: {
      description: 'Close the Bat-Terminal.',
      usage: 'exit',
      fn: () => {
        if (onClose) onClose();
        return 'Closing session...';
      },
    },
    // Anniversary command
    date: {
      description: 'Show current mission timeline.',
      usage: 'date',
      fn: () => 'MISSION DAY: 2,190 (6 Years). Status: Happier than ever.',
    },
    // Fun interactive command
    coupon: {
      description: 'Generate a relationship reward.',
      usage: 'coupon',
      fn: () => {
        return (
          `
  -----------------------------
  |  VALID FOR ONE FREE HUG   |
  |     & ONE CUTU KISS       |  
  |      (Redeem Anytime)     |
  |     From: The Bat-Cave    |
  -----------------------------
          `
        );
      },
    },
    // Sudo command (The nerd flex)
    sudo: {
      description: 'Execute command as Super User.',
      usage: 'sudo <command>',
      fn: () => 'ACCESS DENIED: There is only one Batman & that is meeeee muehehe.',
    },
  }), [onClose]);

  return (
    <Terminal
      commands={commands}
      welcomeMessage={[
        "Initializing Bat-Computer v6.0.0.0.",
        "Biometrics Scanned: MATCH CONFIRMED.",
        "Welcome back. Type 'help' to see available gadgets.",
        "Type 'coupon' for a surprise."
      ]}
      promptLabel={'batman@cave:~$'}
      
      // Styling to match the Lego/Retro Theme
      style={{
        height: '100%', // Fills the DraggableWindow
        minHeight: '400px',
        backgroundColor: '#0a0a0a', // Deep black
        border: 'none',
        borderRadius: '0',
      }}
      contentStyle={{
        color: '#fbbf24', // Amber-400 (Lego Batman Yellow)
        fontSize: '1.1rem',
        fontFamily: 'monospace',
        padding: '20px',
      }}
      promptLabelStyle={{
        color: '#ef4444', // Red for the user prompt
        fontWeight: 'bold'
      }}
      inputTextStyle={{
        color: '#fbbf24', // Yellow input
        fontWeight: 'normal'
      }}
    />
  );
};

export default BatTerminal;