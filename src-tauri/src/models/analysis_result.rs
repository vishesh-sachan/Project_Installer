use crate::models::repository::RepositoryInfo;
use crate::models::project::ProjectProfile;
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnalysisResult {
    pub repository: RepositoryInfo,
    pub projects: Vec<ProjectProfile>,
}