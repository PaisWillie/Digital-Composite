exports.addToBlacklist = async ({ Year, Program, Name, Id }) => {
    // Check if already exists
    const exists = blacklisted.some(
      (entry) => entry.Id === Id && entry.Year === Year && entry.Program === Program
    );
  
    if (!exists) {
      blacklisted.push({ Year, Program, Name, Id });
    }
    // In real production, you'd insert into a database or perform other actions
  };