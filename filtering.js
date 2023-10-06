// Sample array of posts
// 1. filter one:
const posts = [
  {
      id: 1,
      type: ['news'],
      tags: ['javascript', 'programming']
  },
  {
      id: 2,
      type: ['article', 'tutorial'],
      tags: ['javascript', 'web development']
  },
  {
      id: 3,
      type: ['tutorial'],
      tags: ['python', 'programming']
  },
  // Add more posts here
];

// Function to filter posts based on type and tags
function filterPosts(posts, filterType, filterTags) {
  return posts.filter(post => {
      // Check if the post type matches the filterType (if provided)
      const typeMatch = filterType ? post.type.includes(filterType) : true;

      // Check if at least one of the filterTags is present in the post's tags (if filterTags are provided)
      const tagMatch = filterTags ? filterTags.some(tag => post.tags.includes(tag)) : true;

      // Return true if both type and tag conditions are met
      return typeMatch && tagMatch;
  });
}

// Example usage:
const filteredPosts1 = filterPosts(posts, 'tutorial', ['javascript', 'programming']);
console.log(filteredPosts1);


// 2. filter two:
const postss = [
    {
        id: 1,
        type: 'news',
        tags: 'javascript'
    },
    {
        id: 2,
        type: 'article',
        tags: 'web development'
    },
    {
        id: 3,
        type: 'tutorial',
        tags: 'python',
    },
    // Add more posts here
];

// Function to filter posts based on type and tags
function filterPosts(posts, filterType, filterTags) {
    return posts.filter(post => {
        // Check if the post type matches the filterType (if provided)
        const typeMatch = filterType ? post.type === filterType : true;

        // Check if the post tags match the filterTags (if provided)
        const tagMatch = filterTags ? post.tags === filterTags : true;

        // Return true if both type and tag conditions are met
        return typeMatch && tagMatch;
    });
}

// Example usage:
const filteredPosts2 = filterPosts(postss, 'tutorial', 'python');
console.log(filteredPosts2);

// 3. filter three:

// Sample array of posts
const postsss = [
  {
      id: 1,
      type: 'news',
      tags: 'javascript'
  },
  {
      id: 2,
      type: 'article',
      tags: 'web development'
  },
  {
      id: 3,
      type: 'tutorial',
      tags: 'python',
  },
  // Add more posts here
];

// Function to filter posts based on type
function filterByType(posts, filterType) {
  if (!filterType || filterType.length==0) return true;
  return  filterType.includes(posts.type) ;
}

// Function to filter posts based on tags
function filterByTags(posts, filterTags) {
  if (!filterTags || filterTags.length==0) return true;
  return filterTags.includes(posts.tags);
}

// Combine filters based on type and tags without using logical OR
function filterPosts(posts, filterType, filterTags) {
  return posts.filter(post=> filterByType(post, filterType).filter(post=> filterByTags(post, filterTags)));
}

// Example usage:
const filterType = ['news', 'tutorial'];
const filterTags = ['javascript', 'web development'];
const filteredPosts3 = filterPosts(posts, filterType, filterTags);
console.log(filteredPosts3);
