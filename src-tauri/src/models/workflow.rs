use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Workflow {
    pub id: String,
    pub name: String,
    pub steps: Vec<WorkflowStep>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkflowStep {
    pub id: String,
    pub name: String,
    pub step_type: StepType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum StepType {
    Check(CheckStep),
    Input(InputStep),
    Command(CommandStep),
    File(FileStep),
    Choice(ChoiceStep),
    Condition(ConditionStep),
    Information(InformationStep),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CheckStep {
    pub check_type: CheckType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum CheckType {
    ExecutableExists,
    FileExists,
    DirectoryExists,
    ProcessRunning,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InputStep {
    pub key: String,
    pub label: String,
    pub required: bool,
    pub secret: bool,
    pub default_value: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CommandStep {
    pub command: String,
    pub working_directory: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileStep {
    pub action: FileAction,
    pub target_path: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum FileAction {
    Create,
    Copy,
    Append,
    Replace,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChoiceStep {
    pub key: String,
    pub label: String,
    pub options: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConditionStep {
    pub variable: String,
    pub expected_value: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InformationStep {
    pub title: String,
    pub message: String,
    pub link: Option<String>,
}