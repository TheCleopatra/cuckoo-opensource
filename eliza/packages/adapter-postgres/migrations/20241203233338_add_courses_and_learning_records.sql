-- 创建课程表
CREATE TABLE IF NOT EXISTS courses (
    "id" UUID PRIMARY KEY,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" UUID REFERENCES accounts("id"),
    "content" JSONB NOT NULL,
    "status" TEXT DEFAULT 'draft',
    "tags" TEXT[],
    "metadata" JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_author FOREIGN KEY ("authorId") REFERENCES accounts("id") ON DELETE CASCADE
);

-- 创建学习记录表
CREATE TABLE IF NOT EXISTS learning_records (
    "id" UUID PRIMARY KEY,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL REFERENCES accounts("id"),
    "courseId" UUID NOT NULL REFERENCES courses("id"),
    "progress" INTEGER DEFAULT 0,
    "status" TEXT DEFAULT 'in_progress',
    "completedAt" TIMESTAMPTZ,
    "lastAccessedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES accounts("id") ON DELETE CASCADE,
    CONSTRAINT fk_course FOREIGN KEY ("courseId") REFERENCES courses("id") ON DELETE CASCADE
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_courses_author ON courses("authorId");
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses("status");
CREATE INDEX IF NOT EXISTS idx_courses_tags ON courses USING gin("tags");
CREATE INDEX IF NOT EXISTS idx_learning_records_user ON learning_records("userId");
CREATE INDEX IF NOT EXISTS idx_learning_records_course ON learning_records("courseId");
CREATE INDEX IF NOT EXISTS idx_learning_records_status ON learning_records("status");