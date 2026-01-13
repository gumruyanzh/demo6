#!/bin/bash

# Script to check GitHub pull requests for conflicts and merge clean ones
# Usage: ./check-and-merge-prs.sh [--dry-run]

set -e

DRY_RUN=false
if [ "$1" == "--dry-run" ]; then
    DRY_RUN=true
    echo "🔍 Running in DRY RUN mode - no PRs will be merged"
    echo ""
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "================================================"
echo "  PR Conflict Checker and Auto-Merge Tool"
echo "================================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Get list of open PRs
echo "📋 Fetching open pull requests..."

# Initialize counters
MERGED_COUNT=0
CONFLICT_COUNT=0
CLEAN_COUNT=0
TOTAL_PRS=0

# Get PR numbers
PR_NUMBERS=$(gh pr list --json number --jq '.[].number')

if [ -z "$PR_NUMBERS" ]; then
    echo -e "${YELLOW}No open pull requests found.${NC}"
    exit 0
fi

# Count PRs
TOTAL_PRS=$(echo "$PR_NUMBERS" | wc -l)
echo -e "${BLUE}Found $TOTAL_PRS open pull request(s)${NC}"
echo ""

# Process each PR
for PR_NUMBER in $PR_NUMBERS; do
    # Get PR details
    PR_TITLE=$(gh pr view "$PR_NUMBER" --json title --jq '.title')
    MERGEABLE=$(gh pr view "$PR_NUMBER" --json mergeable --jq '.mergeable')
    MERGE_STATE=$(gh pr view "$PR_NUMBER" --json mergeStateStatus --jq '.mergeStateStatus')

    echo "----------------------------------------"
    echo -e "${BLUE}PR #$PR_NUMBER${NC}: $PR_TITLE"
    echo "  Mergeable: $MERGEABLE"
    echo "  State: $MERGE_STATE"

    if [ "$MERGEABLE" == "MERGEABLE" ] && [ "$MERGE_STATE" == "CLEAN" ]; then
        echo -e "  ${GREEN}✓ Ready to merge${NC}"
        CLEAN_COUNT=$((CLEAN_COUNT + 1))

        if [ "$DRY_RUN" == false ]; then
            echo "  🔄 Merging PR #$PR_NUMBER..."
            if gh pr merge "$PR_NUMBER" --merge --delete-branch; then
                echo -e "  ${GREEN}✓ Successfully merged PR #$PR_NUMBER${NC}"
                MERGED_COUNT=$((MERGED_COUNT + 1))
            else
                echo -e "  ${RED}✗ Failed to merge PR #$PR_NUMBER${NC}"
            fi
        else
            echo "  💡 Would merge PR #$PR_NUMBER (dry-run mode)"
        fi
    elif [ "$MERGEABLE" == "CONFLICTING" ]; then
        echo -e "  ${RED}✗ Has conflicts - manual resolution required${NC}"
        CONFLICT_COUNT=$((CONFLICT_COUNT + 1))
    elif [ "$MERGE_STATE" == "BLOCKED" ]; then
        echo -e "  ${YELLOW}⚠ Blocked - check required reviews or status checks${NC}"
    elif [ "$MERGE_STATE" == "BEHIND" ]; then
        echo -e "  ${YELLOW}⚠ Behind base branch - needs update${NC}"
    else
        echo -e "  ${YELLOW}⚠ Not ready to merge (mergeable: $MERGEABLE, state: $MERGE_STATE)${NC}"
    fi
    echo ""
done

# Summary
echo "================================================"
echo "                   SUMMARY"
echo "================================================"
echo -e "Total PRs checked: ${BLUE}$TOTAL_PRS${NC}"

if [ "$DRY_RUN" == false ]; then
    echo -e "Successfully merged: ${GREEN}$MERGED_COUNT${NC}"
else
    echo -e "Would be merged: ${GREEN}$CLEAN_COUNT${NC}"
fi

echo ""
echo "✅ Process completed!"
