import axios from "axios";

const getLeetCodeData = async (username) => {
  try {
    const query = {
      query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
      }`,
      variables: { username }
    };

    const res = await axios.post(
      "https://leetcode.com/graphql",
      query
    );

    return res.data.data.matchedUser;
  } catch (error) {
    console.log(error);
    throw new Error("LeetCode fetch failed");
  }
};

export default getLeetCodeData;