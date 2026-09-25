import {
  RoadmapStep,
  Internship,
  InternshipTask,
  WorkEvent,
  CanvasShape,
  DefenseMessage,
  TwinPassportData
} from './types';

// Asset references generated via generate_image
export const HERO_IMAGE = '/src/assets/images/hero_twin_workspace_1790248871655.jpg';
export const PASSPORT_EMBLEM = '/src/assets/images/twin_passport_badge_1790248884778.jpg';
export const STUDENT_AVATAR = '/src/assets/images/student_avatar_portrait_1790248898547.jpg';
export const NEXUS_3D_ICON = '/src/assets/images/nexus_3d_icon_1790249750605.jpg';

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 'login',
    number: 1,
    title: 'Login & Google SSO',
    titleRu: '1. Вход через Google',
    shortDesc: 'Nexus single sign-on with role credentials & 3D emblem',
    shortDescRu: 'Вход через Google в Nexus и доступ к платформе',
    category: 'onboarding'
  },
  {
    id: 'role-selection',
    number: 2,
    title: 'Role Selection',
    titleRu: '2. Выбор Роли',
    shortDesc: 'Choose Student or Company workspace track',
    shortDescRu: 'Студент (решает и защищает) или Компания (создаёт задачи)',
    category: 'onboarding'
  },
  {
    id: 'internships',
    number: 3,
    title: 'Internships',
    titleRu: '3. Стажировки',
    shortDesc: 'Student browses catalog · Company creates new programs',
    shortDescRu: 'Студент смотрит список, Компания создаёт стажировку',
    category: 'matching'
  },
  {
    id: 'tasks',
    number: 4,
    title: 'Application & Tasks',
    titleRu: '4. Задачи и Навыки',
    shortDesc: 'Student applies · Company configures tasks & required skills',
    shortDescRu: 'Студент откликается, Компания добавляет Tasks + Skills',
    category: 'matching'
  },
  {
    id: 'start-task',
    number: 5,
    title: 'Student Starts Task',
    titleRu: '5. Запуск Задачи',
    shortDesc: 'Sandbox initialization, rubric review and countdown trigger',
    shortDescRu: 'Брифинг, критерии оценки и старт сессии',
    category: 'execution'
  },
  {
    id: 'work-session',
    number: 6,
    title: 'Work Session',
    titleRu: '6. Рабочая Сессия',
    shortDesc: 'Human ↔ AI workflow on editable canvas with WorkEvents telemetry',
    shortDescRu: 'Human → Solution → AI → Verify с сохранением WorkEvents',
    category: 'execution'
  },
  {
    id: 'submit-solution',
    number: 7,
    title: 'Submit Solution',
    titleRu: '7. Отправка Решения',
    shortDesc: 'Artifact verification, code diff and pre-submission audit',
    shortDescRu: 'Финальная проверка решения и коммит артефактов',
    category: 'execution'
  },
  {
    id: 'explanation',
    number: 8,
    title: 'Oral Defense',
    titleRu: '8. Защита Решения',
    shortDesc: 'AI asks question → Student answers → AI asks follow-up',
    shortDescRu: 'AI вопрос → ответ студента → AI follow-up вопрос',
    category: 'defense'
  },
  {
    id: 'evidence',
    number: 9,
    title: 'Evidence Generation',
    titleRu: '9. Генерация Доказательств',
    shortDesc: 'Cryptographic tamper-proof audit trail of the work session',
    shortDescRu: 'Формирование криптографического следа и аналитики',
    category: 'defense'
  },
  {
    id: 'twin-passport',
    number: 10,
    title: 'Nexus Passport',
    titleRu: '10. Nexus Passport',
    shortDesc: 'Holographic verifiable credential with biometric proof of skills',
    shortDescRu: 'Итоговый цифровой паспорт компетенций Nexus Passport',
    category: 'credential'
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-01',
    companyName: 'Apex Distributed Labs',
    companyLogoText: 'APEX',
    title: 'Distributed Systems & Consensus Engine Intern',
    department: 'Core Infrastructure',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    stipend: '$6,500 / mo',
    duration: '12 weeks',
    spots: 2,
    applicantsCount: 47,
    tags: ['Raft Consensus', 'Go / Rust', 'High-Throughput', 'Fault Tolerance'],
    description: 'Design and implement an event-driven partition recovery mechanism for high-frequency state machine replication. Work closely with Senior Infrastructure Architects.',
    tasksCount: 3,
    requiredSkills: ['Distributed Systems', 'Network Primitives', 'AI Orchestration', 'Code Verification'],
    matchScore: 94
  },
  {
    id: 'intern-02',
    companyName: 'Synthetix Quant Capital',
    companyLogoText: 'SQC',
    title: 'Autonomous Execution & Signal Routing Intern',
    department: 'Quantitative Algorithms',
    location: 'New York, NY / Hybrid',
    type: 'Full-time',
    stipend: '$7,200 / mo',
    duration: '10 weeks',
    spots: 3,
    applicantsCount: 62,
    tags: ['Python', 'Order Book Dynamics', 'C++ Low Latency', 'Risk Limits'],
    description: 'Implement algorithmic execution slippage mitigation logic. Use AI copilot assistance while maintaining strict manual mathematical proof of invariant preservation.',
    tasksCount: 2,
    requiredSkills: ['Python', 'Statistical Arbitrage', 'Prompt Precision', 'Mathematical Rigor'],
    matchScore: 89
  },
  {
    id: 'intern-03',
    companyName: 'NeuralFrame Robotics',
    companyLogoText: 'NFR',
    title: 'Perception Pipeline & Spatial SLAM Intern',
    department: 'Autonomous Robotics',
    location: 'Zurich, CH / Remote',
    type: 'Part-time',
    stipend: '$5,800 / mo',
    duration: '16 weeks',
    spots: 1,
    applicantsCount: 34,
    tags: ['Point Clouds', 'ROS2', 'CUDA Acceleration', 'Kalman Filtering'],
    description: 'Optimize real-time LiDAR point cloud feature extraction pipeline with custom kernel shaders and verification test harness.',
    tasksCount: 3,
    requiredSkills: ['Computer Vision', 'CUDA/C++', 'Prompt Tuning', 'Telemetry Auditing'],
    matchScore: 87
  }
];

export const INITIAL_TASKS: InternshipTask[] = [
  {
    id: 'task-consensus-01',
    internshipId: 'intern-01',
    title: 'Design Fault-Tolerant Consensus Partition Recovery',
    estimatedHours: '3.5 hours',
    difficulty: 'Advanced',
    overview: 'In a 5-node cluster, a transient asymmetric network partition isolates nodes 3 and 4 while 18 state transitions occur on leader node 1. Design the log reconciliation protocol.',
    deliverables: [
      'Interactive architecture diagram with heartbeat & quorum boundaries',
      'Production Go implementation of Term Election & Log Rollback handlers',
      'Documented verification proof of zero-loss state transitions'
    ],
    skillsTested: [
      'Distributed Quorums',
      'Go Concurrency',
      'Human-AI Verification',
      'State Machine Safety'
    ],
    rubric: {
      humanReasoningWeight: 40,
      aiOrchestrationWeight: 30,
      codeQualityWeight: 30
    }
  },
  {
    id: 'task-consensus-02',
    internshipId: 'intern-01',
    title: 'High-Throughput Batch Pipeline Benchmarking',
    estimatedHours: '2 hours',
    difficulty: 'Intermediate',
    overview: 'Stress-test the consensus replication loop under 100k req/s burst load with simulated 5% packet drop.',
    deliverables: [
      'Benchmark harness script',
      'Flamegraph bottleneck analysis',
      'Zero-allocation memory optimization'
    ],
    skillsTested: ['Benchmarking', 'Profiling', 'AI Debugging', 'Systems Optimization'],
    rubric: {
      humanReasoningWeight: 35,
      aiOrchestrationWeight: 35,
      codeQualityWeight: 30
    }
  }
];

export const INITIAL_CANVAS_SHAPES: CanvasShape[] = [
  {
    id: 'node-client',
    type: 'box',
    x: 40,
    y: 90,
    width: 140,
    height: 70,
    label: 'Client Gateway\n[gRPC / TLS]',
    color: '#0284c7'
  },
  {
    id: 'node-leader',
    type: 'cylinder',
    x: 240,
    y: 60,
    width: 170,
    height: 90,
    label: 'Leader Node 01\n(Term: 14, Quorum OK)',
    color: '#059669'
  },
  {
    id: 'node-follower-a',
    type: 'cylinder',
    x: 480,
    y: 40,
    width: 150,
    height: 80,
    label: 'Follower Node 02\n(In Sync)',
    color: '#334155'
  },
  {
    id: 'node-isolated-cluster',
    type: 'cloud',
    x: 350,
    y: 200,
    width: 220,
    height: 90,
    label: 'Partition Isolated:\nNodes 03 & 04 (Term 12)',
    color: '#dc2626'
  },
  {
    id: 'node-wal',
    type: 'box',
    x: 100,
    y: 210,
    width: 160,
    height: 70,
    label: 'Write-Ahead Log\n[AppendOnly / Fsync]',
    color: '#7c3aed'
  }
];

export const INITIAL_SOLUTION_CODE = `package consensus

import (
	"context"
	"errors"
	"sync"
	"time"
)

// PartitionRecoveryHandler reconciles split-brain divergent logs.
type PartitionRecoveryHandler struct {
	mu           sync.RWMutex
	currentTerm  uint64
	commitIndex  uint64
	leaderID     string
	wal          *WriteAheadLog
	quorumTarget int
}

func (h *PartitionRecoveryHandler) ReconcileIsolatedFollower(
	ctx context.Context,
	followerID string,
	followerTerm uint64,
	lastLogIndex uint64,
) error {
	h.mu.Lock()
	defer h.mu.Unlock()

	// Human verification: Guard against stale election cycles
	if followerTerm > h.currentTerm {
		return errors.New("err: follower term supersedes local leader")
	}

	// Calculate rollback divergence point
	matchIndex := h.wal.FindLatestCommonCommit(followerID, lastLogIndex)
	entriesToReplay := h.wal.SliceFromIndex(matchIndex + 1)

	// Stream missing state transitions with exponential backoff retry
	return h.wal.StreamBatchAppend(ctx, followerID, entriesToReplay)
}
`;

export const INITIAL_WORK_EVENTS: WorkEvent[] = [
  {
    id: 'ev-01',
    timestamp: '10:14:02',
    timeOffsetSec: 12,
    type: 'HUMAN_KEYSTROKE',
    actor: 'HUMAN',
    summary: 'Authored PartitionRecoveryHandler struct definition',
    payload: 'Defined core concurrency mutex and WriteAheadLog pointer binding.'
  },
  {
    id: 'ev-02',
    timestamp: '10:15:30',
    timeOffsetSec: 100,
    type: 'HUMAN_CANVAS_DRAW',
    actor: 'HUMAN',
    summary: 'Diagrammed network partition isolation boundary',
    payload: 'Mapped out asymmetric link failure isolating nodes 03 & 04 from leader quorum.'
  },
  {
    id: 'ev-03',
    timestamp: '10:17:15',
    timeOffsetSec: 205,
    type: 'HUMAN_PROMPT',
    actor: 'HUMAN',
    summary: 'Human Prompted AI Copilot for term reconciliation logic',
    payload: 'Prompt: "Generate a Go Raft log divergence resolver for asymmetric network partitions with rollback to matchIndex."'
  },
  {
    id: 'ev-04',
    timestamp: '10:17:18',
    timeOffsetSec: 208,
    type: 'AI_RESPONSE',
    actor: 'AI',
    summary: 'AI proposed FindLatestCommonCommit algorithm draft',
    payload: 'Generated 28 lines of code using binary search rollback.'
  },
  {
    id: 'ev-05',
    timestamp: '10:18:45',
    timeOffsetSec: 295,
    type: 'HUMAN_EDIT',
    actor: 'HUMAN',
    summary: 'Human modified AI proposal: inserted stale election guard',
    payload: 'Refactored code: added strict mutex locking and checked followerTerm > h.currentTerm.',
    diffPercent: 42
  },
  {
    id: 'ev-06',
    timestamp: '10:20:10',
    timeOffsetSec: 380,
    type: 'HUMAN_VERIFY',
    actor: 'HUMAN',
    summary: 'Human executed local mock fuzz test suite',
    payload: '10,000 randomized network drops passed with zero data loss.'
  }
];

export const INITIAL_DEFENSE_MESSAGES: DefenseMessage[] = [
  {
    id: 'def-01',
    sender: 'ai',
    timestamp: '10:28:10',
    text: 'Welcome Alex. I have analyzed your work session telemetry and code solution. In line 32 of your PartitionRecoveryHandler, you chose to check `followerTerm > h.currentTerm` and immediately reject rather than stepping down as leader. Walk me through why you made this explicit architectural choice.',
    isFollowUp: false,
    status: 'delivered'
  }
];

export const SAMPLE_DEFENSE_ANSWER = `I chose not to unconditionally step down because the problem specification describes an *asymmetric* network partition where the isolated follower might have incremented its election term in a split vote loop without ever forming a true majority quorum. 

Stepping down immediately would cause unnecessary leader churn and trigger cascade re-elections across the healthy 3-node majority. Instead, I return an error so the leader verifies quorum validity first before initiating a voluntary step-down.`;

export const SAMPLE_DEFENSE_FOLLOWUP = `Excellent distinction regarding asymmetric split-vote loops. 

Now, consider a follow-up scenario: Suppose the isolated follower did successfully commit an un-replicated write during a brief partition window before being cut off. When your \`FindLatestCommonCommit\` identifies divergent uncommitted log entries, how does your WriteAheadLog guarantee that client acknowledged writes are never rolled back?`;

export const SAMPLE_FOLLOWUP_ANSWER = `Under Raft invariants, an entry is only considered client-acknowledged once it has been replicated across a strict majority quorum (N/2 + 1, so 3 of 5 nodes). 

Because the isolated cluster only held 2 nodes (nodes 03 & 04), any uncommitted entry on that branch could mathematically never have been acknowledged to a client. Hence, rolling back entries that never reached consensus is completely safe and guarantees linearizable reads and writes without data loss.`;

export const INITIAL_TWIN_PASSPORT: TwinPassportData = {
  passportId: 'TWIN-2026-US-89412-APEX',
  studentName: 'Alex Chen',
  studentRole: 'Distributed Systems & AI Engineer',
  studentAvatar: STUDENT_AVATAR,
  internshipTitle: 'Distributed Systems & Consensus Engine Intern',
  companyName: 'Apex Distributed Labs',
  issueDate: '2026-09-24',
  status: 'VERIFIED_GOLD',
  merkleRootHash: '0x8f2a91b48d21c97034b7f83e84210d7a04918e7e1c84d62b9a7c8194f0e213b9',
  humanAiRatio: {
    human: 58,
    ai: 42
  },
  defenseScore: 96,
  skills: [
    { name: 'Distributed Consensus & Raft Protocols', level: 'Level 4 / Advanced', score: 95 },
    { name: 'Human-AI Collaborative Problem Solving', level: 'Level 5 / Master', score: 98 },
    { name: 'Critical Code Verification & Invariant Auditing', level: 'Level 4 / Advanced', score: 94 },
    { name: 'Asynchronous Go Systems Architecture', level: 'Level 4 / Advanced', score: 92 },
    { name: 'Oral Technical Defense & System Rationale', level: 'Level 5 / Master', score: 96 }
  ],
  workEventsCount: 28,
  totalTimeSpent: '2h 14m',
  integrityIndex: 99.4
};
