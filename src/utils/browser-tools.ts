/**
 * Utility to handle browser tools initialization
 * 
 * This file provides functions to initialize and connect to browser tools
 * and handle potential connection issues gracefully.
 */

/**
 * Initialize browser tools
 * 
 * Attempts to connect to the browser tools service and handles connection failures
 * by providing appropriate fallbacks.
 */
export const initializeBrowserTools = async (port: number = 3030): Promise<boolean> => {
  try {
    // Try to connect to browser tools service
    const response = await fetch(`http://localhost:${port}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If connection is successful, return true
    if (response.ok) {
      console.log('Browser tools service connected successfully');
      return true;
    }

    // If connection failed but server is responding
    console.warn('Browser tools service responded with error:', await response.text());
    return false;
  } catch (error) {
    // Handle connection errors gracefully
    console.warn('Browser tools service connection failed:', error);
    
    // Try alternative ports if the main port fails
    if (port === 3030) {
      // Try a fallback port
      return initializeBrowserTools(3035);
    }
    
    return false;
  }
};

/**
 * Safely execute a browser tool function
 * 
 * Wraps browser tool function calls to handle errors gracefully
 */
export const safeExecuteBrowserTool = async <T>(
  toolFunction: () => Promise<T>, 
  fallback: T
): Promise<T> => {
  try {
    return await toolFunction();
  } catch (error) {
    console.warn('Error executing browser tool:', error);
    return fallback;
  }
}; 